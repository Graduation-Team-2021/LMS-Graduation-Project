from backend.models.relations.teaches import Teaches_Relation
from backend.models.relations.learns import Learns_Relation

# user/courses
class user_course_relation_controller():
    def get_courses_by_user_id(self,user_id,role):
        if role == 'professor':
            courses = Teaches_Relation.query.filter_by(professor_id=user_id)
        elif role == 'student':
            courses = Learns_Relation.query.filter_by(student_id=user_id)
        else: return
        data = [course.serialize() for course in courses]
        return(data)

    def post_user_course_relation(self,user_course_relation,role):
        if role == 'professor':
            new_teaches_relation = Teaches_Relation(**user_course_relation)
            new_teaches_relation = Teaches_Relation.insert(new_teaches_relation)
        elif role == 'student':
            new_learns_relation = Learns_Relation(**user_course_relation)
            new_learns_relation = Learns_Relation.insert(new_learns_relation)
        else: return
        return

    def delete_user_course_relation(self,user_id,course_code,role):
        if role == 'professor':
            relation = Teaches_Relation.query.filter_by(professor_id=user_id,
                                                        course_code=course_code).one()
            Teaches_Relation.delete(relation)
        elif role == 'student':
            relation = Learns_Relation.query.filter_by(student_id=user_id,
                                                       course_code=course_code).one()
            Learns_Relation.delete(relation)
        else: return
        return