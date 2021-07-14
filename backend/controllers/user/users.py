from models.user.users import User
from models.user.professors import Professor
from models.user.students import Student
from controllers.user.students import students_controller
from controllers.user.professors import professors_controller
from methods.errors import *
from flask_mail import Mail, Message
import smtplib
from methods.auth import *
import os
from models.config import db
from flask import current_app

cont_stud = students_controller()
cont_professor = professors_controller()

class users_controller:
    def get_user(self, user_id):
        try:
            user = User.query.filter_by(user_id=user_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if user is None:
            raise ErrorHandler({
                'description': 'User does not exist.',
                'status_code': 404
            })
        return user.serialize()

    def get_user_by_email(self, email):
        role = ""
        try:
            user = User.query.filter_by(email=email).first()
            if user is None:
                raise ErrorHandler({
                    'description': 'User does not exist.',
                    'status_code': 404
                })
            prof = Professor.query.filter_by(user_id=user.user_id).first()
            student = Student.query.filter_by(user_id=user.user_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if user and not prof and not student:
            return {"user": user.serialize(), "password": user.password, "role": 'admin'}
        elif user and prof:
            role = "professor"
            return {"user": user.serialize(), "password": user.password, "role": role,
                    "scientific_degree": prof.scientific_degree}
        elif user and student:
            role = "student"
            return {"user": user.serialize(), "password": user.password, "role": role,
                    "student_year": student.student_year}

    def delete_user(self, user_id):
        try:
            deleted_user = User.query.filter_by(user_id=user_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if deleted_user is None:
            raise ErrorHandler({
                'description': 'User does not exist.',
                'status_code': 404
            })
        User.delete(deleted_user)
        return

    def update_user(self, user_id, user):
        try:
            updated_user = User.query.filter_by(user_id=user_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if updated_user is None:
            raise ErrorHandler({
                'description': 'User does not exist.',
                'status_code': 404
            })
        # updated_user.delete()
        updated_user = User(**user)
        updated_user.update()
        return updated_user.serialize()
    
    def update_profile_pic(self, user_id, pic):
        # add to Local then to Database
        print(pic)
        file_path = os.path.join(current_app.config['STATIC_PATH'], f"users/{user_id}")
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        file_path = os.path.join(file_path, pic.filename)
        pic.save(file_path)
        user={}
        try:
            updated_user = User.query.filter_by(user_id=user_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if updated_user is None:
            raise ErrorHandler({    
                'description': 'User does not exist.',
                'status_code': 404
            })
        updated_user.picture = f"/static/users/{user_id}/{pic.filename}"
        updated_user.update()
        return updated_user.serialize()

    def post_user(self, user):
        new_user = User(**user)
        try:
            new_user = User.insert(new_user)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return User.query.filter_by(national_id=user["national_id"]).first().user_id
    
    def add_new_user(self,user,student_year,scientific_degree,role):
        id = self.post_user(user)
        if role == "student":
            student = {
                'user_id': id,
                'student_year': student_year or '1'

            }
            cont_stud.post_student(student)

        elif role == 'professor':
            professor = {
                'user_id': id,
                'scientific_degree': scientific_degree or "DR"

            }
            cont_professor.post_professor(professor)

    def get_all_users(self):
        try:
            users = User.query.all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if users is None:
            raise ErrorHandler({
                'description': 'Users do not exist.',
                'status_code': 404
            })
        # users = User.query.all()
        data = [user.serialize() for user in users]
        return data

    def send_email_2(self, msg, reciever):
        msg = msg
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(os.getenv('EMAIL'), os.getenv('PASSWORD'))
        server.sendmail(os.getenv('EMAIL'), reciever, msg)


    #Sha3'ala tamam
    def reset_password(self, user_id, password):
        user = User.query.filter_by(user_id=user_id).first()
        if user:
            try:

                # import random
                # hash = random.getrandbits(128)
                # self.send_email_2(f'your new password is {hex(hash).replace("0x", "")}',
                #                   user.email)  # hena mafeesh moshkela
                user.password = generate_hash(str(password))
                user.update()
                # db.session.commit()
                # self.send_email_2(f"your new password is {str(generate_hash(national_id))}", user.email) el satr da feh moshkela
                # lessa ma3'airtsh el password nafso fl database
                # print(user.password)
                # print(str(generate_hash(national_id)))
                return True
            except ErrorHandler as e:
                return e.error
        else:
            return False
    def search_for_a_user(self,name_string):
        data=User.query.filter(User.name.ilike(f'%{name_string}%')).all()
        return [d.serialize() for d in data]
        #Hello another test