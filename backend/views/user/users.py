from controllers.user.users import users_controller
from controllers.user.students import students_controller
from controllers.user.professors import professors_controller
from methods.auth import *
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import jsonify

controller_object = users_controller()
cont_stud = students_controller()
cont_professor = professors_controller()


# /users/:id
class User(Resource):
    # method_decorators = {'get': [requires_auth('')]}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type=str, location='json')
        self.reqparse.add_argument('email', type=str, location='json')
        self.reqparse.add_argument('national_id', type=str, location='json')
        self.reqparse.add_argument('birthday', type=str, location='json')
        self.reqparse.add_argument('password', type=str, location='json')
        self.reqparse.add_argument('student_year', type=str, location='json')
        self.reqparse.add_argument('scientific_degree', type=str, location='json')
        self.reqparse.add_argument('role', type=str, location='json')

    def get(self, user_id):
        try:
            user = controller_object.get_user(user_id=user_id)
        except ErrorHandler as e:
            return e.error
        return user

    def put(self, user_id):
        args = self.reqparse.parse_args()
        user = {
            'user_id': user_id,
            'name': args['name'],
            'email': args['email'],
            'national_id': args['national_id'],
            'birthday': args['birthday']
        }
        try:
            controller_object.update_user(user_id, user)
        except ErrorHandler as e:
            return e.error
        # return updated_user
        return jsonify({
            'user': user,
            'message': 'User updated successfully',
            'status code': 200
        })

    def delete(self, user_id):
        try:
            user = controller_object.delete_user(user_id=user_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'user': user,
            'message': 'user deleted successfully',
            'status_code': 200
        })

    # Put and post methods are to be done

    # def put(self, user_id, user):
    #     user=jsonify({
    #         'user': user,
    #     })
    #     return controller_object.update_user(user_id,user)


# /users
class Users(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def get(self):
        try:
            users = controller_object.get_all_users()
        except ErrorHandler as e:
            return e.error
        return {
            'total_users': len(users),
            'status_code': 200,
            'users': users
        }


# /sign_up
class Sign_Up(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type=str, location='json')
        self.reqparse.add_argument('email', type=str, location='json')
        self.reqparse.add_argument('national_id', type=str, location='json')
        self.reqparse.add_argument('birthday', type=str, location='json')
        self.reqparse.add_argument('password', type=str, location='json')
        self.reqparse.add_argument('student_year', type=str, location='json')
        self.reqparse.add_argument('scientific_degree', type=str, location='json')
        self.reqparse.add_argument('role', type=str, location='json')

    def post(self):
        args = self.reqparse.parse_args()
        role = args['role']
        user = {
            'name': args['name'],
            'email': args['email'],
            'national_id': args['national_id'],
            'birthday': args['birthday'],
            'password': generate_hash(args['password']),
        }
        # create user and return id
        # if role = teacher create teacher entry else create student entry return auth
        # return controller_object.post_user(user)
        id = controller_object.post_user(user)
        if role == "student":
            student = {
                'user_id': id,
                'student_year': args['student_year']
            }
            cont_stud.post_student(student)

        elif role == 'professor':
            professor = {
                'user_id': id,
                'scientific_degree': args['scientific_degree']
            }
            cont_professor.post_professor(professor)
        return encode_auth_token(id, role)


# /login
class Login(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('email', type=str, location='json')
        self.reqparse.add_argument('password', type=str, location='json')
        # self.reqparse.add_argument('role', type=str, location='json')

    def post(self):
        args = self.reqparse.parse_args()
        try:
            user = controller_object.get_user_by_email(args['email'])
        except ErrorHandler as e:
            return e.error
        try:
            if check_hash(user["password"], args["password"]):  # hashed password
                return encode_auth_token(user["user"]["id"], controller_object.get_user_by_email(args["email"])["role"])
            else:
                return jsonify({
                    'code': 'Wrong credentials',
                    'description': 'Invalid login, please try again.'
                })
        except ErrorHandler as e:
            return e.error


class Profile(Resource):
    method_decorators = {'get': [requires_auth_identity("")]}

    def get(self, user_id, role):
        try:
            user = controller_object.get_user(user_id=user_id)
        except ErrorHandler as e:
            return e.error
        return user
