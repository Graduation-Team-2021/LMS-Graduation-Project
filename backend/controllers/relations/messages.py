from models.relations.messages.messages import Messages
from models.relations.messages.conversation import Conversation
from models.user.users import User
from sqlalchemy import or_, and_
from methods.errors import *


# professor/courses
class messages_controller():
    def get_conversation(self, first_id, second_id):
        try:
            messages = Messages.query.filter(
                or_(and_(Messages.sender_id == first_id, Messages.receiver_id == second_id),
                    and_(Messages.sender_id == second_id, Messages.receiver_id == first_id))).all()
            conversation = Conversation.query.filter(
                or_(and_(Conversation.first_user == first_id, Conversation.second_user == second_id),
                    and_(Conversation.first_user == second_id, Conversation.second_user == first_id))).first().serialize()
            
            if(first_id==conversation['first_user']):
                second_id=conversation['second_user']
            else:
                second_id=conversation['first_user']
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        first_user = User.query.filter(User.user_id==first_id).first().serialize()['name']
        second_user = User.query.filter(User.user_id==second_id).first().serialize()['name']
        data = [message.serialize() for message in messages]
        for d in data:
            del d['conversation_id']
            if d['receiver_id']==first_id:
                d['receiver_name']=first_user
                d['sender_name']=second_user
            else:
                d['receiver_name']=second_user
                d['sender_name']=first_user
        return data

    def post_message(self, message):
        try:
            first_user = message['sender_id']
            second_user = message['receiver_id']
            conversation = Conversation.query.filter(
                or_(and_(Conversation.first_user == first_user, Conversation.second_user == second_user),
                    and_(Conversation.first_user == second_user, Conversation.second_user == first_user))).first()
            if conversation is None:
                new_conversation = Conversation(first_user=first_user,second_user=second_user)
                Conversation.insert(new_conversation) 
                
                conversation = Conversation.query.filter(
                or_(and_(Conversation.first_user == first_user, Conversation.second_user == second_user),
                    and_(Conversation.first_user == second_user, Conversation.second_user == first_user))).first()

            
            
            message['conversation_id'] = conversation.conversation_id
            new_message = Messages(**message)
            new_message = Messages.insert(new_message)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_message

    def delete_message(self, message_id):
        to_be_deleted = Messages.query.filter_by(message_id=message_id).first()
        if not to_be_deleted:
            raise ErrorHandler('message does not exist')
        try:
            Messages.delete(to_be_deleted)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    # lsa maktabtahash fl view => katabtaha fl views 5alas 
    def update_message(self, message_id, msg):
        try:
            to_be_updated = Messages.query.filter_by(message_id=message_id).first()
            to_be_updated = Messages(**msg)
            to_be_updated.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return to_be_updated.serialize()


    def get_all_conversations(self,user_id):
       
        conversations = Conversation.query.filter(or_(Conversation.first_user==user_id,Conversation.second_user==user_id)).all()
        data = [conversation.serialize() for conversation in conversations]
        for conversation in data:
            if(conversation['first_user']==user_id):
                conversation.pop('first_user',None)
                conversation['user_id']=conversation.pop('second_user')
            else:
                conversation.pop('second_user',None)
                conversation['user_id']=conversation.pop('first_user')

            user = User.query.filter(User.user_id==conversation['user_id']).first().serialize()
            conversation['user'] = user 

            recent_message = Messages.query.filter(Messages.conversation_id==conversation['conversation_id']).order_by(Messages.sent_time.desc()).first() 
            conversation['recent_message'] = recent_message.text
            conversation['sent_time'] = recent_message.sent_time
        return data