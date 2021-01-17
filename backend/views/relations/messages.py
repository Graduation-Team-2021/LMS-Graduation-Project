from controllers.relations.messages  import messages_controller
from methods.errors  import ErrorHandler
from flask_restful   import Resource,reqparse
from flask           import current_app,jsonify
from methods.auth import *

controller_object = messages_controller()
# /conversation
class Messages_Relation(Resource):
    method_decorators = {'get': [requires_auth_identity("")]}
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('conversee_id', type = int, location = 'json')

    def get(self,user_id,role,conversee_id):
        try:
            messages = controller_object.get_conversation(user_id,conversee_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'messages':messages,
            'status_code': 200
            })


    