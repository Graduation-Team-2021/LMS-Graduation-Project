from models.relations.delivers import Deliver
from sqlalchemy import or_, and_
from methods.errors import *
from models.course.deliverables import Deliverables
from flask import json
from models.user.students import Student

class delivers_controller():
    def get_deliverable(self, student_id):

        deliverable = Deliver.query.filter_by(student_id=student_id).first()
        if not deliverable:
            raise ErrorHandler({'description': 'deliverable does not exists',
                                'status_code': 500
                                })
        return deliverable.serialize()

    def post_deliverable(self, deliverable):
        new_deliverable = Deliver(**deliverable)
        try:
            new_deliverable = Deliver.insert(new_deliverable)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_deliverable

    def delete_deliverable(self, deliverable_id, student_id):
        try:
            deleted_deliverable = Deliver.query.filter_by(student_id=student_id,
                                                          deliverable_id=deliverable_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
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

    def get_one_student_all_deliverables(self, student_id):
        if not Student.query.filter_by(user_id=student_id).first():
            raise ErrorHandler ({
                "message":"student does not exist",
                "status code":404
            })
        deliverables_list = []
        all_deliverables = Deliverables.query.join(Deliver).filter(
            Deliverables.deliverable_id == Deliver.deliverable_id,
            student_id == Deliver.student_id) \
            .with_entities(Deliverables.deliverable_id, Deliverables.deliverable_name, Deliverables.course_deliverables,
                           Deliverables.deadline)
        deliverable = [deliverable for deliverable in all_deliverables]
        for i in deliverable:
            deliverables_list.append(
                {"deliverable_id": i[0], "deliverable_name": i[1], "course_id": i[2],
                 "deadline": json.dumps(i[3], default=str).replace("\"", "")})
        return deliverables_list
