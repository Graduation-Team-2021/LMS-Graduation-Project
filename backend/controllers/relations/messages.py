from models.relations.messages import Messages
from sqlalchemy import or_, and_
from methods.errors import *


# professor/courses
class messages_controller():
    def get_conversation(self, first_id, second_id):
        try:
            messages = Messages.query.filter(
                or_(and_(Messages.sender_id == first_id, Messages.receiver_id == second_id),
                    and_(Messages.sender_id == second_id, Messages.receiver_id == first_id)))
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data = [message.serialize() for message in messages]
        return data

    def post_message(self, message):
        try:
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
