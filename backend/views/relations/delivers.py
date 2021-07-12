from controllers.relations.delivers import delivers_controller
from flask_restful import Resource, reqparse
from methods.auth import *
from models.course.deliverables import Deliverables
import werkzeug

controller_object = delivers_controller()


# /my_deliverables
class Delivers_Relation(Resource):
    method_decorators = {'post': [requires_auth_identity("")]}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_id', type=int, location='json')

    def post(self, user_id, role):
        student_id = user_id
        if (role=="professor"):
            return jsonify({
                "message": "Only students can upload deliverables",
                "status_code":401
            })
        args = self.reqparse.parse_args()
        delivers_relation = {
            "deliverable_id": args["deliverable_id"],
            "student_id": student_id
        }
        try:
            delivers_id = controller_object.post_delivers_relation(delivers_relation)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'delivers relation added successfully',
            'delivers_id': delivers_id,
            'status_code': 200
        })


# /my_deliverables/<delivers_id>
class Delete_Delivers_Relation(Resource):
    def delete(self, delivers_id):
        try:
            controller_object.delete_delivers_relation(delivers_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable deleted successfully',
            'status_code': 200
        })

    # /my_deliverables/<delivers_id>/upload


class Upload_Deliverable_File(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')

    def post(self, delivers_id):
        args = self.reqparse.parse_args()
        file_to_be_uploaded = args['file']
        try:
            controller_object.upload_deliverable(delivers_id, file_to_be_uploaded)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Deliverable uploaded successfully',
            'status_code': 200
        })


# /my_deliverables/<delivers_id>/download
class Download_Deliverable_File(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def post(self, delivers_id):
        try:
            return controller_object.download_deliverable(delivers_id)
        except ErrorHandler as e:
            return e.error


# /students/<student_id>/deliverables/<deliverable_id>
class Student_Deliverables(Resource):

    def get(self, student_id, deliverable_id):
        try:
            student_deliverables = controller_object.get_all_delivers_by_user_id_and_deliverable_id(student_id,
                                                                                                    deliverable_id)
        except ErrorHandler as e:
            return e.error
        return student_deliverables
