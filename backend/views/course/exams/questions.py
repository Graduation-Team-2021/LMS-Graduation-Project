from controllers.course.exams.questions import questions_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = questions_controller()


# /questions/<question_id>
class Question(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('question', type=str, location='json')
        self.reqparse.add_argument('mark', type=int, location='json')

    def delete(self, question_id):
        try:
            question = controller_object.delete_question(question_id=question_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Question deleted successfully',
            'status_code': 200
        })

    def put(self, question_id):
        args = self.reqparse.parse_args()
        question = {
            'question_id': question_id,
            'question': args['question'],
            'mark': args['mark']
        }
        try:
            controller_object.update_question(question_id, question)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Question updated successfully',
            'status_code': 200
        })


# /exams/<exam_id>/questions
class Questions(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('question', type=str, location='json')
        self.reqparse.add_argument('mark', type=str, location='json')

    def get(self,exam_id):
        try:
            questions = controller_object.get_all_questions(exam_id)
        except ErrorHandler as e:
            return e.error
        return {
            'status_code': 200,
            'questions': questions
        }

    def post(self,exam_id):
        
        args = self.reqparse.parse_args()
        new_question = {
            "question":args["question"],
            "mark":args["mark"],
            "exam_id": exam_id
        }
        try:
            controller_object.post_question(new_question)
            
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Question created successfully',
            'status_code': 200
        })