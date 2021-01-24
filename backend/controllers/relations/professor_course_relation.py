from models.relations.teaches import Teaches_Relation
from models.course.courses import Course
from methods.errors import *


# professor/courses
class professor_course_relation_controller():
    def get_courses_by_professor_id(self, professor_id):
        try:
            courses = Course.query.join(Teaches_Relation).filter(Teaches_Relation.professor_id == professor_id)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data = [course.serialize() for course in courses]
        return (data)

    def post_professor_course_relation(self, professor_course_relation):
        try:
            new_teaches_relation = Teaches_Relation(**professor_course_relation)
            new_teaches_relation = Teaches_Relation.insert(new_teaches_relation)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def delete_professor_course_relation(self, professor_id, course_code):
        try:
            relation = Teaches_Relation.query.filter_by(professor_id=professor_id, course_code=course_code).first()
            if relation is None:
                raise ErrorHandler({
                    'description': 'relation not found',
                    'status_code': 500
                })
            Teaches_Relation.delete(relation)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return
