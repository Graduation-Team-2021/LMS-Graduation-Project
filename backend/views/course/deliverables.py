from controllers.course.deliverables import deliverable_controller
from controllers.relations.student_group_relation import StudentGroupRelationController
from flask_restful import Resource, reqparse
import werkzeug
from flask import jsonify
from methods.errors import *
from methods.auth import *

controller_object = deliverable_controller()
group_controller = StudentGroupRelationController()

# /deliverables/<deliverable_id>
class Deliverable_view(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_name', type=str, location='json')
        self.reqparse.add_argument('deadline', type=str, location='json') #date time not str
        self.reqparse.add_argument('course_deliverables', type=str, location='json')
        self.reqparse.add_argument('students_number', type=int, location='json')
        self.reqparse.add_argument('students_number', type=int, location='json')
        self.reqparse.add_argument('description', type=str, location='json')
        self.reqparse.add_argument('mark', type=int, location='json')

    def get(self, deliverable_id):
        try:
            deliverable = controller_object.get_deliverable(deliverable_id)
        except ErrorHandler as e:
            return e.error
        return deliverable

    def put(self, deliverable_id):
        args = self.reqparse.parse_args()
        deliverable = {
            "deliverable_id": deliverable_id,
            "deliverable_name": args["deliverable_name"],
            "deadline": args["deadline"],
            "course_deliverables": args["course_deliverables"],
            "students_number": args["students_number"],
            "description": args["description"],
            "mark": args["mark"]
        }
        try:
            controller_object.update_deliverable(deliverable_id, deliverable)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable updated successfully',
            'status_code': 200
        })

    def delete(self, deliverable_id):
        try:
            controller_object.delete_deliverable(deliverable_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable deleted successfully',
            'status_code': 200
        })


# /deliverables
class All_Deliverables(Resource):
    method_decorators = {'get': [requires_auth_identity("")]}
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_name', type=str, location='json')
        self.reqparse.add_argument('deadline', type=str, location='json')
        self.reqparse.add_argument('course_deliverables', type=str, location='json')
        self.reqparse.add_argument('students_number', type=int, location='json')
        self.reqparse.add_argument('description', type=str, location='json')
        self.reqparse.add_argument('mark', type=int, location='json')

    def get(self, user_id, role):

        try:
            if role == 'student':
                specific_deliverables = controller_object.get_one_student_all_deliverables(user_id)
            else:
                specific_deliverables = controller_object.get_one_professor_all_deliverables(user_id)
        except ErrorHandler as e:
            return e.error
        return specific_deliverables

    def post(self):
        args = self.reqparse.parse_args()
        deliverable = {
            "deliverable_name": args["deliverable_name"],
            "deadline": args["deadline"],
            "course_deliverables": args["course_deliverables"],
            "students_number": args["students_number"],
            "description": args['description'],
            "mark": args["mark"]
        }
        try:
            deliverable_id = controller_object.post_deliverable(deliverable)
            controller_object.create_groups_for_deliverable(deliverable_id,args["course_deliverables"])
            controller_object.create_deliverable_event(args["course_deliverables"],deliverable)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable added successfully',
            'status_code': 200
        })


# /students_deliverables/<deliverable_id>
class Students_Deliverables(Resource):
    def get(self, deliverable_id):
        try:
            student_deliverables = controller_object.get_all_deliverables_by_deliverable_id(deliverable_id)
        except ErrorHandler as e:
            return e.error
        return student_deliverables

#/course/<course_code>deliverables
class Course_Deliverables(Resource):
    method_decorators = {'get': [requires_auth_identity("")]}
    def get(self,user_id, role,course_code):
        try:
            course_deliverables = controller_object.get_all_course_deliverables(course_code,user_id,role)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'status_code':200,
            'deliverables':course_deliverables
        })
        
#/deliverable_groups/<deliv>
class getGroups(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('user_id', type=int, location='json')
        self.reqparse.add_argument('group_id', type=int, location='json')
        
    def get(self, deliv):
        try:
            groups = controller_object.get_groups(deliv)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'status_code':200,
            'groups':groups
        })
        
    def post(self, deliv):
        args = self.reqparse.parse_args()
        try:
            group_controller.enroll_in_group(args['user_id'], args['group_id'])
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'status_code':200,
            'message':"Success"
        })