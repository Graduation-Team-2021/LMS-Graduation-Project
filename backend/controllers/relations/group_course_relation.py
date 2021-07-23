from models.relations.group_course_relation import GroupCourseRelation
from methods.errors import *

class group_course_controller():
    def add_group_course(self, course, group):
        try:
            q = GroupCourseRelation(**{"group_id": group, "course_id": course})
            q = GroupCourseRelation.insert(q)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return q
    
    def get_all_course_groups(self, course):
        try:
            q = GroupCourseRelation.query.filter(GroupCourseRelation.course_id == course)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return [qq.serialize() for qq in q]
    
    def delete_group_course(self, course, group):
        try:
            GroupCourseRelation.delete(course_id=course, group_id=group)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return 