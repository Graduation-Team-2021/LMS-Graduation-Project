from controllers.relations.has_prerequisites import prequisite_controller
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import jsonify

controller_object = prequisite_controller()


# /courses/<course_id>/prerequisites
class prerequisite_view(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_id', type=str, location='json')
        self.reqparse.add_argument('pre_course_id', type=str, location='json')

    def get(self, course_id):
        try:
            prerequisite = controller_object.get_prequisite(course_id)
        except ErrorHandler as e:
            return e.error
        return prerequisite

    def delete(self, course_id):
        try:
            controller_object.delete_prequisite(course_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({"message": "prequisite deleted successfully", "status_code": 200})

    def put(self,course_id):
        args = self.reqparse.parse_args()
        prerequisite = {"course_code": args["course_id"],
                        "pre_course_id": args["pre_course_id"]}
        try:
            controller_object.update_prerequisite(course_id,prerequisite)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'prerequisite': prerequisite,
            'message': 'prerequisite updated successfully',
            'status code': 200
        })

# /prerequisites
class postAndUpdatePrequisites(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_id', type=str, location='json')
        self.reqparse.add_argument('pre_course_id', type=str, location='json')

    def post(self):
        args = self.reqparse.parse_args()
        prequisite = {'course_code': args['course_id'], 'pre_course_id': args['pre_course_id']}
        try:
            controller_object.post_prequisite(prequisite)
        except ErrorHandler as e:
            return e.error
        return jsonify({"message": "prequisite added successfully", "status_code": 200})




# /prerequisites
class retrieve_all_prequisites(Resource):
    def get(self):
        try:
            return controller_object.retrieve_all()
        except ErrorHandler as e:
            return e.error
