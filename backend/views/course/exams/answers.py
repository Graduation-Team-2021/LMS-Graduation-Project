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


# /questions/question_id/answers
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
