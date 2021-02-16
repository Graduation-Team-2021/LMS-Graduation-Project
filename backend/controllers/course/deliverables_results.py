from methods.errors import *
import os

from flask import current_app, send_file, send_from_directory

from models.course.deliverables_results import Deliverables_Results
from controllers.course.deliverables import deliverable_controller

from flask import json

deliverable_controller = deliverable_controller()
class deliverable_results_controller:
    def post_deliverable_result(self, deliverable_result):
        deliverable = deliverable_controller.get_deliverable(deliverable_result['deliverable_id'])
        if deliverable['mark']<deliverable_result['mark']:
            raise ErrorHandler({
                'description': "Mark assigned is higher than the maximum allowed.",
                'status_code': 404
            })
        new_deliverable_result = Deliverables_Results(**deliverable_result)
        try:
            Deliverables_Results.insert(new_deliverable_result)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return 

   