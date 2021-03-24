from models.relations.finished import Finished
from methods.errors import *


class finished_relation_controller():
    def get_finished_courses(self, student_id):
        try:
            finished_courses = Finished.query.filter_by(student_id=student_id).all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data = [course.serialize() for course in finished_courses]
        return data

    def post_finished_course(self, course):
        new_course = Finished(**course)
        try:
            new_course.insert()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })

    def update_finished_course(self, student_id, course_code, new_course):
        try:
            to_be_updated = Finished.query.filter_by(course_code=course_code, student_id=student_id).first()
            to_be_updated.delete()
            # Finished.delete(to_be_updated)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if to_be_updated is None:
            raise ErrorHandler({
                'description': 'Course does not exist.',
                'status_code': 404
            })
        to_be_updated = Finished(**new_course)
        to_be_updated.update()
        return to_be_updated.serialize()

    def delete_finished_course(self, student_id, course_code):
        try:
            deleted_course = Finished.query.filter_by(student_id=student_id, course_code=course_code).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if deleted_course is None:
            raise ErrorHandler({
                'description': 'course does not exist.',
                'status_code': 404
            })
        Finished.delete(deleted_course)
        return deleted_course
