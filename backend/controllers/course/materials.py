from models.course.materials import Materials
from methods.errors import *
from flask import current_app, send_from_directory
import os,shutil


class materials_controller():
    def get_Materials(self, course_code):
        materials = Materials.query.filter_by(course_material=course_code).all()
        if materials is None:
            raise ErrorHandler({
                'description': 'Materials does not exist.',
                'status_code': 404
            })

        data = [material.serialize() for material in materials]
        return data
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

    def download_material(self, material_id):
        try:
            material = self.get_material_with_id(material_id)
            material_type = material['material_type']
            material_name = material['material_name']
            course_code = material['course_material']
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
                                     f"materials\{material_id}")
            return send_from_directory(file_path, filename=f"{material_name}{material_type.lower()}", as_attachment=True)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        except FileNotFoundError:
            raise ErrorHandler({
                'description': "File not found.",
                'status_code': 404
            })
        
    
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
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
                                     f"materials\{material_id.material_id}")
            if not os.path.exists(file_path):
                os.makedirs(file_path)
            file_path = os.path.join(file_path, file.filename)
            file.save(file_path)
            return
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        except FileNotFoundError:
            raise ErrorHandler({
                'description': "File not found.",
                'status_code': 404
            })
