from controllers.relations.student_group_relation import StudentGroupRelationController
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import jsonify

controller_object=StudentGroupRelationController()


#student/<student_id>/groups
class StudentGroupView(Resource):
    def get(self,student_id):
        try:
            groups= controller_object.get_one_student_all_groups(student_id)    
        except ErrorHandler as e:
            return e.error
        data_array=[]
        for i in range(len(groups)):
           data_array.append(
               {
                   "student_name":groups[i][0],
                   "group_id":groups[i][1]
               }
           )
        return data_array

#group/<group_id>/students
class EachGroupStudents(Resource):
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