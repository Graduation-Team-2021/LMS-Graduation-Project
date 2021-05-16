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

    def put(self, group_id):
        args = self.reqparse.parse_args()
        group = {
            "group_id": group_id,
            "group_name": args['group_name'],
            'group_description':args['group_description'],
            'post_owner_id':args['post_owner_id']
        }
        try:
            controller_object.update_group(group_id, group)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'group updated successfully',
            'status_code': 200
        })

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
        self.reqparse.add_argument('group_description', type=str, location='json')
        
    def get(self):
        try:
            project_groups = controller_object.get_all_groups()
            return jsonify({
                'project_groups':project_groups,
                'status_code':200
            })
        except ErrorHandler as e:
            return e.error

    def post(self):
        args = self.reqparse.parse_args()
        group = {
            'group_name': args['group_name'],
            'group_description':args['group_description'],
        }
        try:
            controller_object.insert_group(group)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Group created successfully',
            'status_code': 200
        })
#/groups/search
class SearchGroupByName(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('group_name', type=str, location='json')

    def get(self):
        args = self.reqparse.parse_args()
        group_name=args['group_name']
        return controller_object.search_for_a_group(group_name)