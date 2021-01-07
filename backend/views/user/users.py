from backend.controllers.user.users     import users_controller
from backend.controllers.course.courses import courses_controller
from flask_restful                      import Resource
from flask                              import current_app,jsonify

class User(Resource):
    def get(self):
        controller_object = users_controller()
        user = controller_object.get_user(user_id=1)
        return user
