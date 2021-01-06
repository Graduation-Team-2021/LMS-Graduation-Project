from backend.controllers.users import users_controller
from flask_restful import Resource
from flask import current_app,jsonify

class Users(Resource):
    def get(self):
        controller_object = users_controller()
        user = controller_object.get_user(user_id=1)
        return user