from backend.controllers.user.users     import users_controller
from backend.controllers.course.courses import courses_controller
from backend.methods.auth               import Auth
from flask_restful                      import Resource,reqparse
from flask                              import current_app,jsonify

#/users/:id
class User(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.controller_object = users_controller()
    def get(self):
        user = self.controller_object.get_user(user_id=1)
        return user

#/sign_up
class Sign_Up(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.auth = Auth()
        self.controller_object = users_controller()
        self.reqparse.add_argument('name', type = str, location = 'json')
        self.reqparse.add_argument('email', type = str, location = 'json')
        self.reqparse.add_argument('national_id', type = int, location = 'json')
        self.reqparse.add_argument('birthday', type = str, location = 'json')
        self.reqparse.add_argument('password', type = str, location = 'json')

    def post(self):
        args = self.reqparse.parse_args()
        role = args['role']
        user = {
            'name': args['name'],
            'email': args['email'],
            'national_id': args['national_id'],
            'birthday': args['birthday'],
            'password': args['password']
        }
        # create user and return id
        # if role = teacher create teacher entry else create student entry return auth
        return self.auth.encode_auth_token(1)
