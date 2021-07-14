from controllers.relations.group_course_relation import group_course_controller
from controllers.course.group_project import GroupProjectController
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import jsonify

controller = group_course_controller()

# /courses/<course_code>/groups
class all_group_course(Resource):
    def get(self, course_code):
        try:
            data = []
            q = controller.get_all_course_groups(course_code)
            for g in q:
                data.append(GroupProjectController.get_group(g["group_id"]))
        except ErrorHandler as e:
            return e.error
        return {'groups': data, "status_code": 200}