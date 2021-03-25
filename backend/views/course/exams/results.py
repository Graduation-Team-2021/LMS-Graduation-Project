from controllers.course.exams.results import results_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = results_controller()


# /students/<student_id>/exams/<exam_id>/results
class Results(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('mark', type=float, location='json')

    def get(self, student_id, exam_id):
        try:
            return controller_object.get_student_results(student_id, exam_id)
        except ErrorHandler as e:
            return e.error

    def post(self, student_id, exam_id):

        args = self.reqparse.parse_args()
        new_results = {
            "student_id": student_id,
            "exam_id": exam_id,
            "mark": args['mark']
        }
        try:
            controller_object.post_results(new_results)

        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Results answer added successfully',
            'status_code': 200
        })
