from controllers.course.group_project import GroupProjectController
from methods.auth import *
from flask_restful import Resource, reqparse

controller_object = GroupProjectController()


# /project-groups/<group_id>
class GroupProject(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('group_name', type=str, location='json')

    def get(self, group_id):
        try:
            group = controller_object.get_group(group_id)
        except ErrorHandler as e:
            return e.error
        return {
            'status_code': 200,
            'Group': group
        }

    def delete(self, group_id):
        try:
            controller_object.delete_group(group_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Group deleted successfully',
            'status_code': 200
        })


# /project-groups
class InsertGroup(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('group_name', type=str, location='json')

    def post(self):
        args = self.reqparse.parse_args()
        group = {
            'group_name': args['group_name']
        }
        try:
            controller_object.insert_group(group)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Group created successfully',
            'status_code': 200
        })
