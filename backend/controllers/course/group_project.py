from models.course.group_project import GroupProject
from methods.errors import *
from flask import current_app, send_from_directory, json
import os


class GroupProjectController:
    def get_group(self, group_id):
        try:
            group = GroupProject.query.filter_by(group_id=group_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if group is None:
            raise ErrorHandler({
                'description': 'Group does not exist.',
                'status_code': 404
            })
        return group.serialize()

    def insert_group(self, group):
        new_group = GroupProject(**group)
        GroupProject.insert(new_group)
        return new_group

    def delete_group(self,group_id):
        try:
            to_be_deleted=GroupProject.query.filter_by(group_id=group_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if not to_be_deleted:
            raise ErrorHandler({
                "description": "Group does not exist",
                "status_code": 404
            })
        to_be_deleted.delete()
        return True
