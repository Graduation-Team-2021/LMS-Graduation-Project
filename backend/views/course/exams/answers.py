from controllers.course.exams.answers import answers_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = answers_controller()


# /answers/<answer_id>
class Answer(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('answer', type=str, location='json')
        self.reqparse.add_argument('right_answer', type=bool, location='json')

    def get(self, answer_id):
        try:
            return controller_object.get_answer(answer_id)
        except ErrorHandler as e:
            return e.error

    def delete(self, answer_id):
        try:
            answer = controller_object.delete_answer(answer_id=answer_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Answer deleted successfully',
            'status_code': 200
        })

    def put(self, answer_id):
        args = self.reqparse.parse_args()
        answer = {
            'answer_id': answer_id,
            'answer': args['answer'],
            'right_answer': args['right_answer']
        }
        try:
            controller_object.update_answer(answer_id, answer)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Answer updated successfully',
            'status_code': 200
        })


# /questions/<question_id>/answers
class Answers(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('answer', type=str, location='json')
        self.reqparse.add_argument('right_answer', type=bool, location='json')

    def post(self, question_id):
        args = self.reqparse.parse_args()
        answer = {
            'question_id': question_id,
            'answer': args['answer'],
            'right_answer': args['right_answer']
        }
        try:
            controller_object.post_answer(answer)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Answer created successfully',
            'status_code': 200
        })


# answers/all/right/answers/<question_id>
class Get_All_Right_Answers(Resource):
    def get(self, question_id):
        try:
            right_answers = controller_object.get_all_correct_answers(question_id)
            return right_answers
        except ErrorHandler as e:
            return e.error


# answers/all/wrong/answers/<question_id>
class Get_All_Wrong_Answers(Resource):
    def get(self, question_id):
        try:
            wrong_answers = controller_object.get_all_wrong_answers(question_id)
            return wrong_answers
        except ErrorHandler as e:
            return e.error
