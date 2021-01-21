from controllers.user.professors import professors_controller
from methods.auth import *
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import jsonify

controller_object = professors_controller()


# /professor/<user_id>
class Professor(Resource):
    # method_decorators = {'get': [requires_auth('')]}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def get(self, user_id):
        try:
            professor = controller_object.get_professor(prof_id=user_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({'professor': professor,
                        'status_code': 200})

    def delete(self, user_id):
        try:
            professor = controller_object.delete_professor(user_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'professor': professor,
            'message': 'professor deleted successfully',
            'status_code': 200
        })
    # Put and post methods are to be done


# /professors
class Professors(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def get(self):
        try:
            professrs = controller_object.get_all_professors()
        except ErrorHandler as e:
            return e.error
        return {
            'total_professors': len(professrs),
            'status_code': 200,
            'professors': professrs
        }
