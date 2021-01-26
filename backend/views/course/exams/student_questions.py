from controllers.course.exams.student_questions import student_questions_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = student_questions_controller()


# /student/<student_id>/question
class Student_Questions(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('question_id', type=int, location='json')

    def post(self, student_id):

        args = self.reqparse.parse_args()
        new_student_question = {
            "student_id": student_id,
            "question_id": args["question_id"]
        }
        try:
            controller_object.post_student_question(new_student_question)

        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Student question created successfully',
            'status_code': 200
        })
