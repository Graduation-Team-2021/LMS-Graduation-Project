from backend.models.user.users import User


class users_controller:
    def get_user(self,user_id):
        user_object = User()
        return user_object.get(user_id)
    

   
    