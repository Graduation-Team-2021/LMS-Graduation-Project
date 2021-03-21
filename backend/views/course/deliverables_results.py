from controllers.course.deliverables_results import deliverable_results_controller
from flask_restful import Resource, reqparse
import werkzeug
from flask import jsonify
from methods.errors import *

controller_object = deliverable_results_controller()


# /students/<student_id>/deliverable/<deliverable_id>/results
class Deliverable_Results(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('mark', type=int, location='json')

        
    def get(self,deliverable_id,student_id):
        try:
            deliverable_result = controller_object.get_deliverable_result(deliverable_id,student_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'mark':deliverable_result.mark,
            'full_mark':deliverable_result.full_mark,
            'status_code': 200
        })
    
    def put(self,deliverable_id,student_id):
        args = self.reqparse.parse_args()
        try:
            new_deliverable_result = {
            'user_id':student_id,
            'deliverable_id':deliverable_id,
            'mark':args['mark']
            }
            controller_object.update_deliverable_result(new_deliverable_result)
            
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message':'deliverable results updated successfully',
            'status_code': 200
        })
        
        
    def post(self,student_id,deliverable_id):
        args = self.reqparse.parse_args()
        deliverable_result = {
            "deliverable_id":deliverable_id,

            "user_id": student_id,
            "mark": args["mark"]
        }
        try:
            controller_object.post_deliverable_result(deliverable_result)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable added successfully',
            'status_code': 200
        })

