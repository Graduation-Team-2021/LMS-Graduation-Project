from controllers.user.users import users_controller
from controllers.user.students import students_controller
from controllers.user.professors import professors_controller
from methods.auth import *
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import jsonify
from models.user.professors import Professor
from models.user.students import Student
import werkzeug,pandas,json

controller_object = users_controller()
cont_stud = students_controller()
cont_professor = professors_controller()


# /users/<user_id>
class User(Resource):
    # method_decorators = {'get': [requires_auth('')]}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('user_id', type=str, location='json')
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
            'birthday': args['birthday'],
        }
        try:
            controller_object.update_user(user_id, user)
            prof_to_be_updated = Professor.query.filter_by(user_id=user_id).first()
            student_to_be_updated = Student.query.filter_by(user_id=user_id).first()
            if prof_to_be_updated:
                professor = {
                    'user_id': user_id,
                    'scientific_degree': args['scientific_degree']
                }
                cont_professor.update_professor(user_id, professor)
                return jsonify({
                    'Professor': professor,
                    'message': 'professor updated successfully',
                    'status code': 200
                })
            elif student_to_be_updated:
                student = {
                    'user_id': user_id,
                    'student_year': args['student_year']
                }
                cont_stud.update_student(user_id, student)
                return jsonify({
                    'Student': student,
                    'message': 'student updated successfully',
                    'status code': 200
                })

            # if args['scientific_degree']:
            #     professor = {
            #         'user_id': user_id,
            #         'scientific_degree': args['scientific_degree']
            #     }
            #     cont_professor.update_professor(user_id,professor)
            # elif args['student_year']:
            #     student = {
            #         'user_id': user_id,
            #         'student_year': args['student_year']
            #     }
            #     cont_stud.update_student(user_id,student)

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
        self.reqparse.add_argument('picture', type=str, location='json')

    def post(self):
        args = self.reqparse.parse_args()
        role = args['role']
        student_year = args['student_year']
        scientific_degree = args['scientific_degree']
        user = {
            'name': args['name'],
            'email': args['email'],
            'national_id': args['national_id'],
            'birthday': args['birthday'],
            'password': generate_hash(args['password']),
            "picture": args['picture']
        }
        try:
            controller_object.add_new_user(user,student_year,scientific_degree,role)
        except ErrorHandler as e:
            return e.error

        # return encode_auth_token(id, role)
        return jsonify({
            'status_code': 200,
            'description': 'Successful sign_up'
        })

# /sign_up/excel_spreadsheet
class Sign_Up_Using_Excel(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')

    def post(self):
        args = self.reqparse.parse_args()
        raw_data = args['file'].read()
        excel_data = pandas.read_excel(raw_data,dtype=str)
        excel_data = excel_data.to_json(orient='records')
        excel_data = json.loads(excel_data)
        for entry in excel_data:
            date = entry['birthday']
            date = date.split(' ')[0]
            entry['birthday'] = date
            student_year = entry['student_year']
            scientific_degree = entry['scientific_degree']
            role = entry['role']
            entry.pop('student_year',None)
            entry.pop('scientific_degree',None)
            entry.pop('role',None)
            user = entry
            try:
                controller_object.add_new_user(user,student_year,scientific_degree,role)
            except ErrorHandler as e:
                return e.error

        return jsonify({
            'message': 'Users Added successfully',
            'status_code': 200
        })



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
            if check_hash(user["password"], args["password"]) or user['password'] == args[
                'password']:  # hashed password #zawedt el b3d el or 3ashan 7war el reset password by email msh sha3'al
                 print(user)
                 print(user['user'])
                 return jsonify({
                    'status_code': 200,
                    "name":user['user']['name'],
                    'token':encode_auth_token(user["user"]["user_id"],user["role"]),
                    
                })
            else:
                return jsonify({
                    'status_code': 404,
                    'description': 'Invalid login, please try again.'
                })
        except ErrorHandler as e:
            return e.error


# /reset/password
class Reset_password(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('user_id', type=str, location='json')
        self.reqparse.add_argument('password', type=str, location='json')

    def post(self):
        args = self.reqparse.parse_args()
        try:
            if controller_object.reset_password(args['user_id'], args['password']):
                return jsonify({"message": 'an email has been sent to you.'})
            return jsonify("wrong national id , please re-check your data.")
        except ErrorHandler as e:
            return e.error


# /users/<user_id>/profile
class Profile(Resource):

    # This requires the user to be logged in
    method_decorators = {'get': [requires_auth_identity("")]}

    def get(self, user_id):
        try:
            user = controller_object.get_user(user_id=user_id)
        except ErrorHandler as e:
            return e.error
        return user

#/users/search
class SearchUserByName(Resource):
    # def __init__(self):
    #     self.reqparse = reqparse.RequestParser()
    #     self.reqparse.add_argument('name', type=str, location='json')

    def get(self, name):
        # args = self.reqparse.parse_args()
        # name=args['name']
        return controller_object.search_for_a_user(name)

#/users/<user_id>/pic
class updatePic(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("pic", type=werkzeug.datastructures.FileStorage, location='files')
        
    def post(self, user_id):
        args = self.reqparse.parse_args()
        try:
            return controller_object.update_profile_pic(user_id, args['pic'])
        except ErrorHandler as e:
            return e.error