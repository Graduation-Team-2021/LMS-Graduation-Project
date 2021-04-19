from controllers.user.professors import professors_controller
from methods.auth import *
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import jsonify

controller_object = professors_controller()


# /professors/<user_id>
class Professor(Resource):
    # method_decorators = {'get': [requires_auth('')]}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('user_id', type=str, location='json')
        self.reqparse.add_argument('scientific_degree', type=str, location='json')

    def get(self, user_id):
        try:
            professor = controller_object.get_professor(user_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({'professor': professor,
                        'status_code': 200})

    def put(self, user_id):
        args = self.reqparse.parse_args()
        default_professor = controller_object.get_professor(user_id)
        professor = {'user_id': user_id, 'scientific_degree': args['scientific_degree'] or default_professor['scientific_degree'] }
        try:
            controller_object.update_professor(user_id, professor)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'professor': professor,
            'message': 'professor updated successfully',
            'status code': 200
        })

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
        self.reqparse.add_argument('user_id', type=str, location='json')
        self.reqparse.add_argument('scientific_degree', type=str, location='json')

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

    def post(self):
        args = self.reqparse.parse_args()

        new = {
            'user_id': args['user_id'],
            'scientific_degree': args['scientific_degree']}
        try:
            controller_object.post_professor(new)
        except ErrorHandler as e:
            return e.error
        return jsonify({'message': 'professor added successfully', 'status_code': 200})