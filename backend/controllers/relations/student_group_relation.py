from models.relations.student_group_relation import StudentGroupRelation
from models.user.students import Student
from models.user.users import User
from models.course.group_project import GroupProject
from methods.errors import *
from flask import jsonify

class StudentGroupRelationController:
    def get_one_student_all_groups(self,student_id):
        # try:
        #     groups=StudentGroupRelation.query.join(GroupProject).filter(StudentGroupRelation.group_id==GroupProject.group_id).join(Student).filter(StudentGroupRelation.student_id==Student.user_id==student_id).join(User).filter(User.user_id==student_id).with_entities(Student.user_id,User.name,GroupProject.group_id,GroupProject.group_name)
        # except SQLAlchemyError as e:
        #     return e.error
        # results_array=list()
        # for i in groups:
        #     results_array.append(i)
        # return results_array
        #     try:
        #         groups=StudentGroupRelation.query.filter(StudentGroupRelation.student_id==student_id).all()
        #     except SQLAlchemyError as e:
        #         return e.error
        #     data=[group.serialize() for group in groups]
        #     return data
        # groups=StudentGroupRelation.query.join(GroupProject).filter(GroupProject.group_id==StudentGroupRelation.group_id).join(Student).filter(Student.user_id==student_id).join(User)\
        # .filter(User.user_id==Student.user_id)\
        # .with_entities(User.name,StudentGroupRelation.group_id,GroupProject.group_name)
        # groups_list=list()
        # for g in groups:
        #     groups_list.append(g)
        # return groups_list
        groups=StudentGroupRelation.query.join(Student).\
            filter(Student.user_id==student_id).join(User).filter(Student.user_id==User.user_id).\
            join(GroupProject).filter(GroupProject.group_id==StudentGroupRelation.group_id).\
            with_entities(User.name,GroupProject.group_name,StudentGroupRelation.group_id,GroupProject.group_description)
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