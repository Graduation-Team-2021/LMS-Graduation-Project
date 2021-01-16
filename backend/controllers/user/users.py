from models.user.users import User
from methods.errors import *


class users_controller:
    def get_user(self,user_id):
        user = User.query.filter_by(user_id=user_id).first()
        if user is None:
            raise UserNotFound
        return user.serialize()
    

   
    