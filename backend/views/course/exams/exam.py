from controllers.course.exams.exam import exams_controller
from controllers.course.exams.student_answers import student_answers_controller
from controllers.course.exams.student_questions import student_questions_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = exams_controller()


# /events/<event_id>/exams
class Exams(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('actual_mark', type=str, location='json')

    def post(self, event_id):

        args = self.reqparse.parse_args()
        new_exam = {
            "actual_mark": args["actual_mark"],
            "event_id": event_id,
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
            'exam_id': exam_id,
            "actual_mark": args["actual_mark"]
        }
        try:
            controller_object.update_exam(exam_id, new_exam)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Exam updated successfully',
            'status_code': 200
        })


# /exams/<exam_id>/submit_exam
class Submit_Exam(Resource):
    # method_decorators = {'post': [requires_auth_identity("")]}
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def post(self, exam_id):
        args = self.reqparse.parse_args()
        student_id = 1
        try:
            submitted_exam = controller_object.submit_exam(exam_id, student_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Exam submitted successfully',
            'status_code': 200
        })


# /exams/<exam_id>/my_results
class Student_Exam_Results(Resource):
    # method_decorators = {'post': [requires_auth_identity("")]}
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def get(self, exam_id):
        try:
            my_results = controller_object.student_exam_results(exam_id)
        except ErrorHandler as e:
            return e.error
        return my_results

#/exams_by_course/<course_id>
class ExamByCourseID(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def get(self,course_id):
        return controller_object.get_exam_by_course_id(course_id)
    
    def post(self,course_id):
       args = self.reqparse.parse_args()
       exam={'course_id':course_id,'exam_duration':args['exam_duration']}
       controller_object.post_exam(exam)
       return "Exam added successfully"

