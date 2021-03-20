from models.user.students import Student
from models.user.users import User
from methods.errors import *


class students_controller():
    def get_student(self, user_id):
        try:
            students = Student.query.join(User).filter(User.user_id == user_id).with_entities(User.name, User.user_id,
                                                                                              User.email,
                                                                                              User.national_id,
                                                                                              User.birthday,
                                                                                              Student.student_year)
        except ErrorHandler as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        student = [student for student in students]
        if not student:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })
        return {'name': student[0][0], 'email': student[0][2], 'national_id': student[0][3],
                'id': student[0][1], 'student_year': student[0][5], "birthday": student[0][4]}
        # return student

    def delete_student(self, user_id):
        try:
            deleted_student = Student.query.filter_by(user_id=user_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if deleted_student is None:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })
        Student.delete(deleted_student)
        return

    def update_student(self, user_id, student):
        try:
            updated_student = Student.query.filter_by(user_id=user_id)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if updated_student is None:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })
        updated_student = Student(**student)
        updated_student.update()
        return updated_student.serialize()

    def post_student(self, student):
        new_student = Student(**student)
        try:
            new_student = Student.insert(new_student)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return new_student

    def get_all_students(self):
        try:
            students = Student.query.all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if students is None:
            raise ErrorHandler({
                'description': 'Students do not exist.',
                'status_code': 404
            })
        data = [student.serialize() for student in students]
        return data
