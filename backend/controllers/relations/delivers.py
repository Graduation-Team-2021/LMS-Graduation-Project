from models.relations.delivers import Deliver
from sqlalchemy import or_, and_
from methods.errors import *


class delivers_controller():
    def get_deliverable(self, group_id, deliverable_id, student_id):

        deliverable = Deliver.query.filter_by(group_id=group_id,
                                              deliverable_id=deliverable_id, student_id=student_id).first()
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

    def delete_deliverable(self, group_id, deliverable_id, student_id):
        deleted_deliverable = Deliver.query.filter_by(group_id=group_id, student_id=student_id,
                                                      deliverable_id=deliverable_id).first()
        if not deleted_deliverable:
            raise ErrorHandler({
                "description": "Deliverable does not exist",
                "status_code": 404
            })
        Deliver.delete(deleted_deliverable)
        return