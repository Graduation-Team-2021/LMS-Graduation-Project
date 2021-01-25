from methods.errors import *
import os
from flask import current_app, send_file, send_from_directory
from models.course.deliverables import Deliverables
from flask import json


class deliverable_controller:
    def get_deliverable(self, deliverable_id):
        deliverable = Deliverables.query.filter_by(deliverable_id=deliverable_id).first()
        deliverable.deadline = json.dumps(deliverable.deadline, default=str).replace("\"", "")
        if not deliverable:
            raise ErrorHandler({
                'description': 'deliverable does not exist.',
                'status_code': 404
            })
        return deliverable.serialize()

    def post_deliverable(self, deliverable):
        new_deliverable = Deliverables(**deliverable)
        try:
            new_deliverable = Deliverables.insert(new_deliverable)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return new_deliverable

    def delete_deliverable(self, deliverable_id):
        deliverable_to_be_deleted = Deliverables.query.filter_by(deliverable_id=deliverable_id).first()
        try:
            Deliverables.delete(deliverable_to_be_deleted)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return True

    def update_deliverable(self, deliverable_id, deliverable):
        old_deliverable = Deliverables.query.filter_by(deliverable_id=deliverable_id).first()
        if not old_deliverable:
            raise ErrorHandler({
                'description': 'deliverable does not exist.',
                'status_code': 404
            })
        updated_deliverable = Deliverables(**deliverable)
        updated_deliverable.update()
        return updated_deliverable.serialize()

    # sha3'ala
    def upload_file(self, student_id, course_code, deliverable_id, file):
        deliverable_name = Deliverables.query.filter_by(deliverable_id=deliverable_id).first().deliverable_name

        # material_type = file.content_type.split("/")[1]
        file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
                                 f"deliverables\{deliverable_name}",
                                 f"student\student-id{student_id}",
                                 f"{file.filename.split('.')[1]}")
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        file_path = os.path.join(file_path, file.filename)
        file.save(file_path)
        return

    # msh sha3'ala
    def download_deliverable(self, student_id, course_code,
                             deliverable_id):  # deliverable type is the extension of the file , i.e. txt,pdf
        try:
            deliverable_name = Deliverables.query.filter_by(deliverable_id=deliverable_id).first().deliverable_name
            deliverable_type = Deliverables.query.filter_by(deliverable_id=deliverable_id).first().deliverable_type
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
                                     f"deliverables\{deliverable_name}",
                                     f"student\student-id{student_id}",
                                     f"{deliverable_type}")
            return f"{file_path}" + "\\" + f"{deliverable_name}.{deliverable_type.lower()}"
            # return send_from_directory(file_path,f"{deliverable_name}.{deliverable_type}",as_attachment=True)
            # send_from_directory(file_path, filename=f"{material_name}.{material_type}", as_attachment=True)
            # return send_file(filename_or_fp="C:/Users/tarek/Desktop/LMS-Graduation-Project/backend/static/courses/123/deliverables/MANET_experiment/student/student-id1/JPG/MANET_experiment.jpg",                 attachment_filename=f"{deliverable_name}.{deliverable_type}")
            # return send_from_directory(file_path, filename=f"{deliverable_name}.{deliverable_type.lower()}",as_attachment=True)
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

    def get_all_deliverables(self):
        deliverables_list = []
        deliverables = Deliverables.query.all()
        if deliverables is None:
            raise ErrorHandler({
                'description': 'Course does not exist.',
                'status_code': 404
            })
        for deliverable in deliverables:
            deliverable.deadline = json.dumps(deliverable.deadline, default=str).replace("\"", "")
        deliverables = [deliverable.serialize() for deliverable in deliverables]
        return deliverables
