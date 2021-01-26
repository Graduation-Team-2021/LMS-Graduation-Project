from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify
from controllers.course.exams.student_questions import student_questions_controller
from controllers.course.exams.student_answers import student_answers_controller

controller_object = student_questions_controller()
student_answers_object = student_answers_controller()
#/student/<student_id>/question
class Student_Questions(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('question_id', type=int, location='json')
        self.reqparse.add_argument('student_answers',action='append')

    def post(self,student_id):
        try:
            args = self.reqparse.parse_args()
            question_id = args["question_id"]
            student_answers =args['student_answers']
            controller_object.add_student_answer(student_id,question_id,student_answers)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Student answer created successfully',
            'status_code': 200
        })
    
    def put(self,student_id):
        try:
            args = self.reqparse.parse_args()
            question_id = args["question_id"]
            student_answers =args['student_answers']
            student_question_id = controller_object.get_student_question(student_id,question_id).student_question_id
            student_answers_object.update_student_answer(student_id,question_id,student_answers,student_question_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Student answer updated successfully',
            'status_code': 200
        })


