from models.relations.learns import Learns_Relation
from models.course.courses import Course
from methods.errors import *
from flask import jsonify


# student/courses
class student_course_relation_controller():
    def get_courses_by_student_id(self, student_id):
        try:
            courses = Learns_Relation.query.filter_by(student_id=student_id).all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data = [course.serialize() for course in courses]
        return data

    def post_student_course_relation(self, student_course_relation):
        try:
            new_learns_relation = Learns_Relation(**student_course_relation)
            new_learns_relation = Learns_Relation.insert(new_learns_relation)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def update_student_course_relation(self, student_id, course_code, new_relation):
        relation = Learns_Relation.query.filter_by(student_id=student_id, course_code=course_code).first()
        relation.delete()
        if not relation:
            raise ErrorHandler('relation does not exist,please recheck your data')

        the_update = Learns_Relation(**new_relation)
        try:
            the_update.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return the_update.serialize()

    def delete_student_course_relation(self, student_id, course_code):
        try:
            relation = Learns_Relation.query.filter_by(student_id=student_id, course_code=course_code).first()
            if relation is None:
                raise ErrorHandler({
                    'description': 'relation not found',
                    'status_code': 500
                })
            Learns_Relation.delete(relation)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return
