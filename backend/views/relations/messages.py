from controllers.relations.messages import messages_controller
from methods.errors import ErrorHandler
from flask_restful import Resource, reqparse
from flask import current_app, jsonify
from methods.auth import *

controller_object = messages_controller()


# /users/messages/<conversee_id>
class Messages_Relation(Resource):
    method_decorators = [requires_auth_identity("")]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('text', type=str, location='json')
        self.reqparse.add_argument('sent_time', type=str, location='json')

    def get(self, user_id, role, conversee_id):
        try:
            messages = controller_object.get_conversation(user_id, conversee_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'messages': messages,
            'status_code': 200
        })

    def post(self, user_id, role, conversee_id):
        args = self.reqparse.parse_args()
        message = {
            'sender_id': user_id,
            'receiver_id': conversee_id,
            'text': args['text'],
            'sent_time': args['sent_time']
        }
        try:
            message = controller_object.post_message(message)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Message added successfully',
            'status_code': 200
        })
