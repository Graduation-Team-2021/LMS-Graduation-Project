from controllers.course.materials import materials_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify, send_from_directory
import werkzeug

controller_object = materials_controller()


# /courses/<course_code>/materials/<id>
class material(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('material_name', type=str, location='json')
        self.reqparse.add_argument('material_type', type=str, location='json')
        self.reqparse.add_argument('downloadable', type=bool, location='json')
        self.reqparse.add_argument('file_path', type=str, location='json')
        self.reqparse.add_argument('course_material', type=str,
                                   location='json')  # course material is the course code to which the materials belong
        self.reqparse.add_argument('students_number', type=int, location='json')

    def delete(self, course_code, id):
        try:
            material = controller_object.delete_Material(material_id=id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Material deleted successfully',
            'status_code': 200
        })

    def put(self, course_code, id):
        args = self.reqparse.parse_args()
        material = {
            'material_name': args['material_name'],
            'course_material': course_code,  # course material is the course code to which the materials belong
            'material_type': args['material_type'],
            'downloadable': args['downloadable'],
            'file_path': args['file_path'],
            'students_number': args['students_number'],
            "material_id": id
        }
        try:
            mateiral = controller_object.update_Material(id, material)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'material updated successfully',
            'status_code': 200
        })


# /courses/<course_code>/materials
class materials(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('material_name', type=str, location='json')
        self.reqparse.add_argument('material_type', type=str, location='json')
        self.reqparse.add_argument('downloadable', type=bool, location='json')
        self.reqparse.add_argument('file_path', type=str, location='json')
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

    def post(self, course_code):
        args = self.reqparse.parse_args()
        materials = {
            'course_material': course_code,  # course material is the course code to which the materials belong
            'material_name': args['material_name'],
            'material_type': args['material_type'],
            'downloadable': args['downloadable'],
            'file_path': args['file_path'],
            'students_number': args['students_number']
        }
        try:
            materials = controller_object.post_Materials(materials)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Materials created successfully',
            'status_code': 200
        })


# /courses/<course_code>/materials/<id>/download
class download_material(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def post(self, id, course_code):
        try:
            material = controller_object.get_Material(id)
            return controller_object.download_material(material, course_code)
        except ErrorHandler as e:
            return e.error


# /courses/<course_code>/materials/<id>/upload
class upload_material(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')

    def post(self, id, course_code):
        args = self.reqparse.parse_args()
        data = args['file']
        controller_object.upload_material(data, course_code)
        return jsonify({
            'message': 'Materials uploaded successfully',
            'status_code': 200
        })
