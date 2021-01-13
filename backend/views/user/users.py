from controllers.user.users     import users_controller
from methods.auth               import *
from methods.errors             import *
from flask_restful              import Resource,reqparse


controller_object = users_controller()
#/users/:id
class User(Resource):
    method_decorators = {'get': [requires_auth('admin')]}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('Authorization', type=str, location='headers')
        
    def get(self,user_id):
        try:
            user = controller_object.get_user(user_id=user_id)
        except UserNotFound:
            return 
        return user

#/sign_up
class Sign_Up(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type = str, location = 'json')
        self.reqparse.add_argument('email', type = str, location = 'json')
        self.reqparse.add_argument('national_id', type = int, location = 'json')
        self.reqparse.add_argument('birthday', type = str, location = 'json')
        self.reqparse.add_argument('password', type = str, location = 'json')
        self.reqparse.add_argument('role', type = str, location = 'json')
        

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
        return encode_auth_token(1,'admin')
