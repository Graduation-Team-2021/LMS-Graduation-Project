from models.course.materials import Materials
from methods.errors import *
from flask import current_app, send_from_directory,redirect
from flask import url_for
import os,shutil
import base64
class materials_controller():
    def get_Materials(self, course_code):
        materials = Materials.query.filter_by(course_material=course_code).all()
        if materials is None:
            raise ErrorHandler({
                'description': 'Materials does not exist.',
                'status_code': 404
            })

        data = [material.serialize_all() for material in materials]
        data_formatted = {
            'course_code':course_code,
            'materials':data
        }
        return data_formatted
    
    def get_course_pdfs(self,course_code):
        materials = Materials.query.filter_by(course_material=course_code).filter_by(material_type=".pdf").all()
        if materials is None:
            raise ErrorHandler({
                'description': 'Materials does not exist.',
                'status_code': 404
            })
        data = [material.serialize_all() for material in materials]
        data_formatted = {
            'course_code':course_code,
            'materials':data
        }
        return data_formatted
    
    def get_course_videos(self,course_code):
        materials = Materials.query.filter_by(course_material=course_code).filter(Materials.material_type!=".pdf").all()
        if materials is None:
            raise ErrorHandler({
                'description': 'Materials does not exist.',
                'status_code': 404
            })
        data = [material.serialize_all() for material in materials]
        data_formatted = {
            'course_code':course_code,
            'materials':data
        }
        return data_formatted
    def get_material_with_id(self,material_id):
        material = Materials.query.filter_by(material_id=material_id).first()
        if material is None:
            raise ErrorHandler({
                'description': 'Material does not exist.',
                'status_code': 404
            })
        return material.serialize()

    def delete_Material(self, material_id):
        material = self.get_material_with_id(material_id)
        deleted_Materials = Materials.query.filter_by(material_id=material_id).first()
        course_code = material['course_material']
        file_path = os.path.join(current_app.config['STATIC_PATH'],f"courses\{course_code}",
                                    f"materials\{material_id}")
        shutil.rmtree(file_path)
        if deleted_Materials is None:
            raise ErrorHandler({
                'description': 'Materials does not exist.',
                'status_code': 404
            })
        Materials.delete(deleted_Materials)
        return

    def get_material_uri(self, material_id):
        try:
            material = self.get_material_with_id(material_id)
            material_type = material['material_type']
            material_name = material['material_name']
            course_code = material['course_material']
            file_path = f"courses/{course_code}/materials/{material_id}/{material_name}{material_type.lower()}"
            return url_for('static',filename=file_path)                      
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        except FileNotFoundError:
            raise ErrorHandler({
                'description': "File not found.",
                'status_code': 404
            })

    # def preview_material(self, material_id):
    #     try:
    #         material = self.get_material_with_id(material_id)
    #         material_type = material['material_type']
    #         material_name = material['material_name']
    #         course_code = material['course_material']
            
    #         file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
    #                                  f"materials\{material_id}\{material_name}{material_type.lower()}")
    #         data = self.generate(file_path)
            
    #         return data
    #     except SQLAlchemyError as e:
    #         error = str(e)
    #         raise ErrorHandler({
    #             'description': error,
    #             'status_code': 500
    #         })
    #     except FileNotFoundError:
    #         raise ErrorHandler({
    #             'description': "File not found.",
    #             'status_code': 404
    #         })
        
    
    def post_Materials(self, materials):
        new_Materials = Materials(**materials)
        new_Materials = Materials.insert(new_Materials)
        return new_Materials

    def upload_material(self, file, course_code):
        try:
            file_name, file_type = os.path.splitext(file.filename)
            material = {
                "material_name": file_name,
                "material_type": file_type,
                "course_material": course_code
            }
            self.post_Materials(material)
            material_id = Materials.query.order_by(Materials.material_id.desc()).first()
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses/{course_code}",
                                     f"materials/{material_id.material_id}")
            if not os.path.exists(file_path):
                os.makedirs(file_path)
            file_path = os.path.join(file_path, file.filename)
            file.save(file_path)
            url_for("static", filename=file_path)
            return
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        except FileNotFoundError:
            raise ErrorHandler({
                'description': "File not found.",
                'status_code': 404
            })

    def generate(self,file_path):
        s=""
        with open(file_path, 'rb') as f_in:
            s = base64.b64encode(f_in.read())
        return s