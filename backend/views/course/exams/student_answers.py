from controllers.course.exams.student_answers import student_answers_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = student_answers_controller()

#/student_question/<student_question_id>/student_answer
class Student_Answers(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('student_answer', type=str, location='json')

    def post(self,student_question_id):
        
        args = self.reqparse.parse_args()
        new_student_answer = {
            "student_question_id":student_question_id,
            "student_answer":args["student_answer"]
        }
        try:
            controller_object.post_student_answer(new_student_answer)
            
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Student answer added successfully',
            'status_code': 200
        })
    

