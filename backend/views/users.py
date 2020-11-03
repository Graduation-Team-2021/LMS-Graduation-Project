from ..controllers.users import users_controller

class Users():
    def get(self):
        controller_object = users_controller()
        user = controller_object.get_user(user_id=1)
        return user