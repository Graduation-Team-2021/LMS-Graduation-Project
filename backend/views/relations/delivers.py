from controllers.relations.delivers import delivers_controller
from flask_restful import Resource, reqparse
from methods.auth import *

controller_object = delivers_controller()


class Delivers_Relation(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_id', type=int, location='json')
        self.reqparse.add_argument('group_id', type=int, location='json')
        self.reqparse.add_argument('student_id', type=int, location='json')

    def get(self, group_id, deliverable_id, student_id):
        try:
            delivers = controller_object.get_deliverable(group_id, deliverable_id, student_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({"delivers": delivers, "status_code": 200})

    def post(self,group_id, deliverable_id, student_id):
        args = self.reqparse.parse_args()
        deliverable = {
            "group_id":group_id,
            "deliverable_id": deliverable_id,
            "student_id":student_id
        }
        try:
            controller_object.post_deliverable(deliverable)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable added successfully',
            'status_code': 200
        })
