from models.relations.delivers import Deliver
from sqlalchemy import or_, and_
from methods.errors import *
from models.course.deliverables import Deliverables
from models.course.deliverables_results import Deliverables_Results
from models.course.courses import Course
from flask import json, current_app, send_file, send_from_directory
from models.user.students import Student
import os


class delivers_controller():
    def get_all_delivers_by_user_id_and_deliverable_id(self, user_id, deliverable_id):
        try:
            delivers_relations = Deliver.query.filter(Deliver.student_id == user_id).filter(
                Deliver.deliverable_id == deliverable_id)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if not delivers_relations:
            raise ErrorHandler({'description': 'deliverables do not exist',
                                'status_code': 500
                                })
        deliver_relations_formatted = []
        for i in delivers_relations:
            deliver_relations_formatted.append(i.serialize())
        return deliver_relations_formatted

    def post_delivers_relation(self, delivers_relation):
        new_delivers_relation = Deliver(**delivers_relation)
        try:
            Deliver.insert(new_delivers_relation)
            new_delivers_id = Deliver.query.order_by(Deliver.delivers_id.desc()).first()
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_delivers_id.delivers_id

    def delete_delivers_relation(self, delivers_id):
        try:
            deleted_deliverable = Deliver.query.filter_by(delivers_id=delivers_id).first()
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if not deleted_deliverable:
            raise ErrorHandler({
                "description": "Deliverable does not exist",
                "status_code": 404
            })
        Deliver.delete(deleted_deliverable)
        return True

    def update_delivers_relation(self, delivers_id, updated_delivers):
        try:
            updated_delivers_relation = Deliver(**updated_delivers)
            updated_delivers_relation.update()
            return
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })

    def upload_deliverable(self, delivers_id, file):
        try:
            file_name, file_type = os.path.splitext(file.filename)
            delivers_relation = Deliver.query.filter_by(delivers_id=delivers_id).first()
            if delivers_relation is None:
                raise ErrorHandler({
                    'description': "Deliverable not found.",
                    'status_code': 404
                })
            deliverable_id = delivers_relation.deliverable_id
            student_id = delivers_relation.student_id
            course_code = Deliverables.query.filter_by(deliverable_id=deliverable_id).first().course_deliverables
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
                                     f"deliverables\{deliverable_id}",
                                     f"student-id{student_id}",
                                     f"{delivers_id}")
            if not os.path.exists(file_path):
                os.makedirs(file_path)
            file_path = os.path.join(file_path, file.filename)
            file.save(file_path)
            updated_delivers = {
                'delivers_id': delivers_id,
                'file_type': file_type,
                'file_name': file_name
            }
            self.update_delivers_relation(delivers_id, updated_delivers)
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

    def download_deliverable(self, delivers_id):
        try:
            delivers_relation = Deliver.query.filter_by(delivers_id=delivers_id).first()
            file_name = delivers_relation.file_name
            file_type = delivers_relation.file_type
            deliverable_id = delivers_relation.deliverable_id
            student_id = delivers_relation.student_id
            course_code = Deliverables.query.filter_by(deliverable_id=deliverable_id).first().course_deliverables
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}",
                                     f"deliverables\{deliverable_id}",
                                     f"student-id{student_id}",
                                     f"{delivers_id}")

            return send_from_directory(file_path, filename=f"{file_name}{file_type.lower()}", as_attachment=True)
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

    def count_number_of_ungraded_deliverables(self, deliverable_id):
        try:
            student_marks = Deliver.query.outerjoin(Deliverables_Results,
                                                    and_(Deliver.deliverable_id == Deliverables_Results.deliverable_id,
                                                         Deliver.student_id == Deliverables_Results.user_id)).filter(
                Deliver.deliverable_id == deliverable_id).group_by(Deliver.deliverable_id,
                                                                   Deliver.student_id).with_entities(
                Deliverables_Results.mark)
            count = 0
            for i in student_marks:
                if i[0] is None:
                    count = count + 1
            return count
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
