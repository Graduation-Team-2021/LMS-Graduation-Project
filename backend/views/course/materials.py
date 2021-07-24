from controllers.course.materials import materials_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse, request
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
        return {**{
            'status_code': 200,
             
        },**materials}
# /courses/<course_code>/materials/pdfs
class materials_pdfs(Resource):
    def get(self, course_code):
        try:
            materials = controller_object.get_course_pdfs(course_code)
        except ErrorHandler as e:
            return e.error
        return {**{
            'status_code': 200,
             
        },**materials}
# /courses/<course_code>/materials/videos
class materials_videos(Resource):
    def get(self, course_code):
        try:
            materials = controller_object.get_course_videos(course_code)
        except ErrorHandler as e:
            return e.error
        return {**{
            'status_code': 200,
             
        },**materials}

# /materials/<id>/uri
class download_material(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def get(self, id):
        try:
            return {"url":controller_object.get_material_uri(id)}
        except ErrorHandler as e:
            return e.error

# # /materials/<id>/preview
# class preview_material(Resource):
#     def __init__(self):
#         self.reqparse = reqparse.RequestParser()

#     def get(self, id):
#         try:
#             return {"byte_stream":str(controller_object.preview_material(id))[1:].replace("'",""),"status_code":200}
#         except ErrorHandler as e:
#             return e.error

# /courses/<course_code>/materials/upload
class upload_material(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')

    def post(self, course_code):
        args = self.reqparse.parse_args()
        file_to_be_uploaded = args['file']
        print(request.keys)
        text = controller_object.upload_material(file_to_be_uploaded, course_code)
        return jsonify({
            'message': 'Materials uploaded successfully',
            'status_code': 200
        })
