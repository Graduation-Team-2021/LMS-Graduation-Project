from models.relations.learns import Learns_Relation
from models.course.courses import Course
from models.relations.student_group_relation import StudentGroupRelation
from models.relations.group_course_relation import GroupCourseRelation
from models.user.students import Student
from models.user.users import User
from models.course.group_project import GroupProject
from methods.errors import *
from flask import jsonify

class StudentGroupRelationController:
    def get_one_student_all_groups(self,student_id):
        groups=Learns_Relation.query.\
            filter(Learns_Relation.student_id==student_id).join(Course)\
                .filter(Course.course_code==Learns_Relation.course_code)\
                        .join(GroupCourseRelation)\
            .filter(Course.course_code==GroupCourseRelation.course_id).join(GroupProject).\
                filter(GroupProject.group_id==StudentGroupRelation.group_id).join(StudentGroupRelation)\
            .filter(StudentGroupRelation.student_id==student_id)\
                .with_entities(GroupProject.group_name,GroupProject.group_name,GroupCourseRelation.group_id,GroupProject.group_description,GroupProject.post_owner_id, GroupProject.group_pic)
        data=[g for g in groups]
        return data

    def get_one_group_all_students(self,group_id):
        # try:
        #     students=StudentGroupRelation.query.filter(StudentGroupRelation.group_id==group_id).all()
        # except SQLAlchemyError as e:
        #     return e.error
        # data=[student.serialize() for student in students]
        # return data
        students=StudentGroupRelation.query.\
            join(GroupProject).filter(GroupProject.group_id==group_id).\
            join(Student).filter(Student.user_id==StudentGroupRelation.student_id).\
            with_entities(GroupProject.group_name,StudentGroupRelation.student_id)
        data=[s for s in students]
        return data
    
    def enroll_in_group(self, user, group):
        enroll = StudentGroupRelation(**{
            "group_id": group,
            "student_id": user
        })
        try:
            enroll = enroll.insert()
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        