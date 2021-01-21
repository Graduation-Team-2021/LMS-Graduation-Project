from models.user.users import User
from models.user.professors import Professor
from models.user.students import Student
from methods.errors import *


class users_controller:
    def get_user(self, user_id):
        user = User.query.filter_by(user_id=user_id).first()
        if user is None:
            raise ErrorHandler({
                'description': 'User does not exist.',
                'status_code': 404
            })
        return user.serialize()

    def get_user_by_email(self, email):
        role = ""
        user = User.query.filter_by(email=email).first()
        prof = Professor.query.filter_by(user_id=user.user_id).first()
        student = Student.query.filter_by(user_id=user.user_id).first()
        if user is None:
            raise ErrorHandler({
                'description': 'User does not exist.',
                'status_code': 404
            })
        if user and not prof and not student:
            return {"user": user.serialize(), "password": user.password}
        if user and prof:
            role = "professor"
            return {"user": user.serialize(),"password":user.password, "role": role,
                    "scientific_degree": prof.scientific_degree}
        elif user and student:
            role = "student"
            return {"user": user.serialize(),"password":user.password, "role": role, "student_year": student.student_year}

    def delete_user(self, user_id):
        deleted_user = User.query.filter_by(user_id=user_id).first()
        if deleted_user is None:
            raise ErrorHandler({
                'description': 'User does not exist.',
                'status_code': 404
            })
        User.delete(deleted_user)
        return

    def update_user(self, user_id, user):
        updated_user = User.query.filter_by(user_id=user_id)
        if updated_user is None:
            raise ErrorHandler({
                'description': 'User does not exist.',
                'status_code': 404
            })
        updated_user = User(**user)
        updated_user.update()
        return updated_user.serialize()

    def post_user(self, user):
        new_user = User(**user)
        new_user = User.insert(new_user)
        return User.query.filter_by(national_id=user["national_id"]).first().user_id

    def get_all_users(self):
        users = User.query.all()
        if users is None:
            raise ErrorHandler({
                'description': 'Users do not exist.',
                'status_code': 404
            })
        data = [user.serialize() for user in users]
        return data
