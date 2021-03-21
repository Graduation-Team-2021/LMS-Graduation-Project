from controllers.course.deliverables import deliverable_controller
from flask_restful import Resource, reqparse
import werkzeug
from flask import jsonify
from methods.errors import *

controller_object = deliverable_controller()


# /deliverables/<deliverable_id>
class Deliverable_view(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_name', type=str, location='json')
        self.reqparse.add_argument('deadline', type=str, location='json')
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
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_name', type=str, location='json')
        self.reqparse.add_argument('deadline', type=str, location='json')
        self.reqparse.add_argument('course_deliverables', type=str, location='json')
        self.reqparse.add_argument('students_number', type=int, location='json')
        self.reqparse.add_argument('description', type=str, location='json')
        self.reqparse.add_argument('mark', type=int, location='json')

    def get(self):
        student_id = 11 #change to auth id later
        role = 'teacher'
        try:
            if role == 'student':
                specific_deliverables = controller_object.get_one_student_all_deliverables(student_id)
            else:
                specific_deliverables = controller_object.get_one_professor_all_deliverables(11)
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
            controller_object.post_deliverable(deliverable)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable added successfully',
            'status_code': 200
        })

# /students_deliverables/<deliverable_id>
class Students_Deliverables(Resource):
        def get(self,deliverable_id):
            try:
                student_deliverables = controller_object.get_all_deliverables_by_deliverable_id(deliverable_id)
            except ErrorHandler as e:
                return e.error
            return student_deliverables

    