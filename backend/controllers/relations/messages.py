from models.relations.messages import Messages
from sqlalchemy import or_,and_
from methods.errors import *

# professor/courses
class messages_controller():
    def get_conversation(self,first_id,second_id):
        try:
            messages = Messages.query.filter(or_(and_(Messages.sender_id==first_id,Messages.receiver_id==second_id),and_(Messages.sender_id==second_id,Messages.receiver_id==first_id)))
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
            'description':error,
            'status_code': 500
            })
        data = [message.serialize() for message in messages]
        return(data)