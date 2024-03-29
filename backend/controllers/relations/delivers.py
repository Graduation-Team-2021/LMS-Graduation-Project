from models.course.group_project import GroupProject
from models.relations.group_deliverable_relation import GroupDeliverableRelation
from models.relations.student_group_relation import StudentGroupRelation
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
    def get_all_delivers_by_user_id_and_deliverable_id(self, user_id, deliverable_id, number):
        try:
            if number == 1 :
                delivers_relations = Deliver.query.filter(Deliver.student_id == user_id).filter(
                Deliver.deliverable_id == deliverable_id)
                delivers_relations = [d.serialize() for d in delivers_relations]
            else:
                group = None
                groups = Deliverables_Results.query.filter(
                            Deliverables_Results.deliverable_id == deliverable_id
                        ).join(Deliverables).filter(Deliverables.deliverable_id==Deliverables_Results.deliverable_id)\
                            .join(GroupDeliverableRelation).filter(GroupDeliverableRelation.deliverable_id
                                                                   == Deliverables.deliverable_id)\
                            .join(GroupProject).filter(GroupProject.group_id == GroupDeliverableRelation.group_id)\
                            .join(StudentGroupRelation).filter(GroupProject.group_id == StudentGroupRelation.group_id)\
                            .filter(Deliverables_Results.user_id == StudentGroupRelation.student_id)\
                                .with_entities(Deliverables_Results.user_id, GroupProject.group_id)\
                                .all()
                for g in groups:
                    s = StudentGroupRelation.query.filter_by(group_id=g[1], student_id=user_id).first()
                    print (s)
                    if s is not None:
                        group = g[0]
                        break
                if group is not None:
                    delivers_relations = Deliver.query\
                    .filter(Deliver.deliverable_id == deliverable_id).filter(
                Deliver.student_id == group)
                    delivers_relations = [d.serialize() for d in delivers_relations]
                else:
                    delivers_relations = []
            print(delivers_relations)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if delivers_relations is None:
            raise ErrorHandler({'description': 'deliverables do not exist',
                                'status_code': 500
                                })
        deliver_relations_formatted = []
        for i in delivers_relations:
            deliver_relations_formatted.append(i)
        return deliver_relations_formatted

    def post_delivers_relation(self, delivers_relation):
        new_delivers_relation = Deliver(**delivers_relation)
        try:
            new_delivers_id = Deliver.insert(new_delivers_relation)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_delivers_id

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
        return deleted_deliverable

    def update_delivers_relation(self, delivers_id, updated_delivers):
        try:
            updated_delivers_relation = Deliver(**updated_delivers)
            updated_delivers_relation = updated_delivers_relation.update()

            return updated_delivers_relation
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })

    def upload_deliverable(self, delivers_id, file):
        try:
            file_name = file.filename
            file_type = file.content_type
            delivers_relation = Deliver.query.filter_by(delivers_id=delivers_id).first()
            if delivers_relation is None:
                raise ErrorHandler({
                    'description': "Deliverable not found.",
                    'status_code': 404
                })
            deliverable_id = delivers_relation.deliverable_id
            student_id = delivers_relation.student_id
            course_code = Deliverables.query.filter_by(deliverable_id=deliverable_id).first().course_deliverables
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses/{course_code}",
                                     f"deliverables/{deliverable_id}",
                                     f"student-id/{student_id}",
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
            file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses/{course_code}",
                                     f"deliverables/{deliverable_id}",
                                     f"student-id/{student_id}",
                                     f"{delivers_id}")
            return send_from_directory(file_path, filename=f"{file_name}", as_attachment=True, mimetype=file_type)
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
            total = 0
            for i in student_marks:
                total +=1
                if i[0] is None:
                    count = count + 1
            return count, total
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
