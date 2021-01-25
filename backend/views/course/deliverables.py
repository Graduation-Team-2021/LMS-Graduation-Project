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

    def get(self, deliverable_id):
        try:
            deliverable = controller_object.get_deliverable(deliverable_id)
        except ErrorHandler as e:
            return e.error
        return deliverable

    def post(self, deliverable_id):
        args = self.reqparse.parse_args()
        deliverable = {
            "deliverable_id": deliverable_id,
            "deliverable_name": args["deliverable_name"],
            "deadline": args["deadline"],
            "course_deliverables": args["course_deliverables"],
            "students_number": args["students_number"]
        }
        try:
            controller_object.post_deliverable(deliverable)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable added successfully',
            'status_code': 200
        })

    def put(self, deliverable_id):
        args = self.reqparse.parse_args()
        deliverable = {
            "deliverable_id": deliverable_id,
            "deliverable_name": args["deliverable_name"],
            "deadline": args["deadline"],
            "course_deliverables": args["course_deliverables"],
            "students_number": args["students_number"]
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


# /students/<student_id>/course/<course_code>/deliverables/upload/<deliverable_id>
class upload_file(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')

    def post(self, student_id, course_code, deliverable_id):
        args = self.reqparse.parse_args()
        file_to_be_uploaded = args['file']
        try:
            controller_object.upload_file(student_id, course_code, deliverable_id, file_to_be_uploaded)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Materials uploaded successfully',
            'status_code': 200
        })


# /students/<student_id>/course/<course_code>/deliverables/download/<deliverable_id>
class download_file(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_type', type=str, location='json')

    def post(self, student_id, course_code, deliverable_id):
        # args = self.reqparse.parse_args()
        # deliverable_type = args['deliverable_type']
        try:
            return controller_object.download_deliverable(student_id, course_code, deliverable_id)
        except ErrorHandler as e:
            return e.error


# /deliverables
class All_Deliverables(Resource):
    def get(self):
        try:
            return controller_object.get_all_deliverables()
        except ErrorHandler as e:
            return e.error
