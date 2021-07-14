from models.course.group_project import GroupProject
from methods.errors import *
from flask import current_app, send_from_directory, json
from controllers.course.post_owner import Post_owner_controller
import os

post_owner_controller = Post_owner_controller()

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
        post_owner_controller.post_owner()
        post_owner_id = post_owner_controller.get_newest_owner_id()
        group['post_owner_id']=post_owner_id
        new_group = GroupProject(**group)
        new_group = GroupProject.insert(new_group)
        return new_group

    def update_group(self, group_id, new_project):
        to_be_updated = GroupProject.query.filter_by(group_id=group_id).first()
        if not to_be_updated:
            raise ErrorHandler({
                'description': 'deliverable does not exist.',
                'status_code': 404
            })
        updated_project = GroupProject(**new_project)
        updated_project.update()
        return updated_project.serialize()

    def delete_group(self, group_id):
        try:
            to_be_deleted = GroupProject.query.filter_by(group_id=group_id).first()
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

    def get_all_groups(self):
        try:
            all_groups=GroupProject.query.all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        data=[g.serialize() for g in all_groups]
        return data

    def search_for_a_group(self,name_string):
        data=GroupProject.query.filter(GroupProject.group_name.ilike(f'%{name_string}%')).all()
        return [d.serialize() for d in data]

    