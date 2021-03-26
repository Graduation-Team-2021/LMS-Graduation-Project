from controllers.course.post_owner import Post_owner_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify, send_from_directory

controller_object=Post_owner_controller()

#/post_owner/add_owner
class PostOwner_view(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('owner_id', type=int, location='json')
    
    def post(self):
        owner={}
        try:
            controller_object.post_postOwner(owner)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'PostOwner created successfully',
            'status_code': 200
        })

#/post_owner/delete/<owner_id>
class OwnerView(Resource):
    def delete(self):
       try:
            controller_object.delete_postowner(owner_id)
       except ErrorHandler as e:
            return e.error
       return jsonify({
            'message': 'Post owner deleted successfully',
            'status_code': 200
        })
 
