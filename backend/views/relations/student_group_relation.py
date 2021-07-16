from controllers.relations.student_group_relation import StudentGroupRelationController
from controllers.relations.group_course_relation import group_course_controller
from controllers.relations.teaches import professor_course_relation_controller
from controllers.course.group_project import GroupProjectController
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import jsonify

controller_object=StudentGroupRelationController()
group_course = group_course_controller()
courses_object = professor_course_relation_controller()
groups_object = GroupProjectController()

#/my_groups
class StudentGroupView(Resource):
    method_decorators = {'get': [requires_auth_identity("")]}
    def get(self, user_id, role):
        try:
            if role=='student': 
                groups= controller_object.get_one_student_all_groups(user_id)    
            else: 
                courses = courses_object.get_courses_by_professor_id(user_id)
                groups = []
                for course in courses:
                    g = group_course.get_all_course_groups(course=course['course_code'])
                    for gg in g:
                        groups.append(groups_object.get_group(gg['group_id']))
                    
                return {"groups":groups, 'status_code':200}
                    
        except ErrorHandler as e:
            return e.error
        data_array=[]
        for i in range(len(groups)):
           data_array.append(
               {
                   "group_id":groups[i][2],
                   "group_name":groups[i][1],
                   "group_description":groups[i][3],
                   'post_owner_id':groups[i][4]
               }
           )
        return {'groups':data_array,'status_code':200}

#group/<group_id>/students
class EachGroupStudents(Resource):
    method_decorators = {'post': [requires_auth_identity("")]}

    def get(self,group_id):
        try:
            students=controller_object.get_one_group_all_students(group_id)
        except ErrorHandler as e:
            return e.error
        data_array=[]
        for i in range(len(students)):
            data_array.append(
                {
                    "group_name":students[i][0],
                    "student_id":students[i][1]
                }
            )
        return data_array
    
    def post(self,user_id, role, group_id):
        try:
            print("Enrolling")
            controller_object.enroll_in_group(user_id, group_id)
        except ErrorHandler as e:
            return e.error
        return {"message": "Enrolled Sucessfully", 'status_code':200}
        