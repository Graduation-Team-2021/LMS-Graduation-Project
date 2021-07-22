from methods.errors import *
import os
from flask import current_app, send_file, send_from_directory
from models.course.deliverables_results import Deliverables_Results
from controllers.course.deliverables import deliverable_controller
from flask import json


deliverable_object = deliverable_controller()

class deliverable_results_controller:
    def get_deliverable_result(self,deliverable_id,user_id):
        try:
            deliverable = deliverable_object.get_deliverable(deliverable_id)
            deliverable_result = Deliverables_Results.query.filter(Deliverables_Results.deliverable_id==deliverable_id).filter(
                Deliverables_Results.user_id==user_id
            ).first()
            if deliverable_result is None:
                raise ErrorHandler({
                'description': 'Deliverable results not found',
                'status_code': 404
            }) 
            deliverable_result.full_mark=deliverable['mark']

            return deliverable_result
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404

            }) 

    def post_deliverable_result(self, deliverable_result):
        deliverable = deliverable_object.get_deliverable(deliverable_result['deliverable_id'])
        if deliverable['mark']<deliverable_result['mark']:
            raise ErrorHandler({
                'description': "Mark assigned is higher than the maximum allowed.",
                'status_code': 404
            })
        new_deliverable_result = Deliverables_Results(**deliverable_result)
        try:
            if self.get_deliverable_result(deliverable_result['deliverable_id'], deliverable_result['user_id']):
                Deliverables_Results.update(new_deliverable_result)
            else:
                Deliverables_Results.insert(new_deliverable_result)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })

        return 
    
    def update_deliverable_result(self,new_deliverable_result):
        try:
            deliverable_result = self.get_deliverable_result(new_deliverable_result['deliverable_id'],new_deliverable_result['user_id'])

            updated_deliverable_result = Deliverables_Results(**new_deliverable_result)
            updated_deliverable_result.update()
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404

            }) 

   

