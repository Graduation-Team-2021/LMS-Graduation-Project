from models.course.courses import Course
from models.relations.teaches import Teaches_Relation
from controllers.user.users import users_controller
from methods.errors import *

user_controller = users_controller()

class courses_controller():
    def get_course(self, course_code):
        try:
            course = Course.query.filter_by(course_code=course_code).first()
            teachers = Teaches_Relation.query.filter_by(course_code=course_code).all()
            teachers = [teacher.serialize() for teacher in teachers]
            teachers_data = []
            for teacher in teachers:
                teacher = user_controller.get_user(teacher['professor_id'])
                teachers_data.append(teacher)

            course = course.serialize()
            course['professors']=teachers_data
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if course is None:
            raise ErrorHandler({
                'description': 'Course does not exist.',
                'status_code': 404
            })
        return course

    def delete_course(self, course_code):
        try:
            deleted_course = Course.query.filter_by(course_code=course_code).first()
            if deleted_course is None:
                raise ErrorHandler({
                    'description': 'Course does not exist.',
                    'status_code': 404
                })
            Course.delete(deleted_course)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def update_course(self, course_code, course):
        try:
            updated_course = Course.query.filter_by(course_code=course_code)
            if updated_course is None:
                raise ErrorHandler({
                    'description': 'Course does not exist.',
                    'status_code': 404
                })
            updated_course = Course(**course)
            updated_course.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            }) 
        return updated_course.serialize()

    def post_course(self, course):
        try:
            new_course = Course(**course)
            new_course = Course.insert(new_course)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_course

    def get_all_courses(self):
        try:
            courses = Course.query.all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if courses is None:
            raise ErrorHandler({
                'description': 'Course does not exist.',
                'status_code': 404
            })
        data = [course.serialize() for course in courses]
        return data
