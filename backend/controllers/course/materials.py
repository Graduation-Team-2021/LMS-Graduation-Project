from models.course.materials import Materials
from methods.errors import *
from flask import current_app, send_from_directory
import os


class materials_controller():
    def get_Materials(self, course_code):
        materials = Materials.query.filter_by(course_material=course_code)
        # TODO: Handle SQLAlchemyError
        if materials is None:
            raise ErrorHandler({
                'description': 'Materials does not exist.',
                'status_code': 404
            })

        data = [material.serialize() for material in materials]
        return (data)

    def get_Material(self, material_id):
        material = Materials.query.filter_by(material_id=material_id).first()
        # TODO: Handle SQLAlchemyError
        if material is None:
            raise ErrorHandler({
                'description': 'Material does not exist.',
                'status_code': 404
            })
        return material.serialize()

    def delete_Material(self, material_id):
        deleted_Materials = Materials.query.filter_by(material_id=material_id).first()
        if deleted_Materials is None:
            raise ErrorHandler({
                'description': 'Materials does not exist.',
                'status_code': 404
            })
        Materials.delete(deleted_Materials)
        return

    def update_Material(self, material_id, material):
        updated_Materials = Materials.query.filter_by(material_id=material_id)
        if updated_Materials is None:
            raise ErrorHandler({
                'description': 'Materials does not exist.',
                'status_code': 404
            })
        updated_Materials = Materials(**material)
        updated_Materials.update()
        return updated_Materials.serialize()

    def post_Materials(self, materials):
        new_Materials = Materials(**materials)
        new_Materials = Materials.insert(new_Materials)
        return new_Materials

    def download_material(self, material, course_code):
        try:
            material_type = material['material_type']
            material_name = material['material_name']
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
                                     f"materials\{material_type}")
            return send_from_directory(file_path, filename=f"{material_name}.{material_type}", as_attachment=True)
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

    def upload_material(self, data, course_code):
        material_type = data.content_type.split("/")[1]
        file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
                                 f"materials\{material_type}")
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        file_path = os.path.join(file_path, data.filename)
        data.save(file_path)
        return
