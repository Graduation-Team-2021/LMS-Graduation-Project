from controllers.course.exams.exam import exams_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = exams_controller()



# /event/<event_id>/exams
class Exams(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('actual_mark', type=str, location='json')

    def post(self,event_id):
        
        args = self.reqparse.parse_args()
        new_exam = {
            "actual_mark":args["actual_mark"],
            "event_id":event_id,
        }
        try:
            controller_object.post_exam(new_exam)
            
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Exam created successfully',
            'status_code': 200
        })

# /exams/<exam_id>
class Exam(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('actual_mark', type=str, location='json')
    
    def get(self, exam_id):
        try:
            exam = controller_object.get_exam(exam_id=exam_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'exam': exam,
            'status_code': 200
        })

    def put(self, exam_id):
        args = self.reqparse.parse_args()
        new_exam = {
            'exam_id':exam_id,
            "actual_mark":args["actual_mark"]
        }
        try:
            controller_object.update_exam(exam_id, new_exam)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Exam updated successfully',
            'status_code': 200
        })