from models.course.courses import Course
from models.user.professors import Professor
from models.relations.teaches import Teaches_Relation
from models.user.users import User
from methods.errors import *

class courses_controller():

    def get_course(self, course_code):
        try:
            course = Course.query.filter_by(course_code=course_code).first()
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
        return course.serialize()

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
            updated_course = Course.query.filter_by(course_code=course_code).first()
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
        courses = Course.query.join(Teaches_Relation).\
        filter(Teaches_Relation.course_code==Course.course_code).join(Professor).filter(Professor.user_id==Teaches_Relation.professor_id).join(User).filter(User.user_id==Professor.user_id).\
        with_entities(Course.course_code,Course.course_name,User.name,Course.course_description)
        if courses is None:
            raise ErrorHandler({
                'description': 'Course does not exist.',
                'status_code': 404
            })
        data = [course for course in courses]
        return data
