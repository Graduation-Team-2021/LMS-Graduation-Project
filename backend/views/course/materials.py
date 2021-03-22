from controllers.course.materials import materials_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify, send_from_directory
import werkzeug

controller_object = materials_controller()


# /materials/<id>
class material(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def delete(self, id):
        try:
            material = controller_object.delete_Material(material_id=id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Material deleted successfully',
            'status_code': 200
        })



# /courses/<course_code>/materials
class materials(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('material_name', type=str, location='json')
        self.reqparse.add_argument('material_type', type=str, location='json')
        self.reqparse.add_argument('downloadable', type=bool, location='json')
        self.reqparse.add_argument('course_material', type=str,
                                   location='json')  # course material is the course code to which the materials belong
        self.reqparse.add_argument('students_number', type=int, location='json')

    def get(self, course_code):
        try:
            materials = controller_object.get_Materials(course_code)
        except ErrorHandler as e:
            return e.error
        return {
            'status_code': 200,
            'materials': materials
        }



# /materials/<id>/download
class download_material(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def post(self, id):
        try:
            return controller_object.download_material(id)
        except ErrorHandler as e:
            return e.error

# /courses/<course_code>/materials/upload
class upload_material(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')

    def post(self, course_code):
        args = self.reqparse.parse_args()
        file_to_be_uploaded = args['file']
        text = controller_object.upload_material(file_to_be_uploaded, course_code)
        return jsonify({
            'message': 'Materials uploaded successfully',
            'status_code': 200
        })
