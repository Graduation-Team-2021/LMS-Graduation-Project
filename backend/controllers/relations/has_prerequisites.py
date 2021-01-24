from models.relations.has_prerequistes import Prerequiste
from models.course.courses import Course
from methods.errors import *
from flask import json, jsonify


class prequisite_controller:
    def get_prequisite(self, course_id):
        try:
            prequisite = Prerequiste.query.filter_by(course_code=course_id).first()

        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if not prequisite:
            raise ErrorHandler({
                'description': 'prerequisite does not exist.',
                'status_code': 404
            })
        course = Course.query.filter_by(course_code=prequisite.course_code).first()
        prequisite_course = Course.query.filter_by(course_code=prequisite.pre_course_id).first()
        # return f"Course code:{course.serialize()['course_code']} ,prequisite course name:{course.serialize()['course_name']} "\
        # +f"prequisite course code:{prequisite_course.serialize()['course_code'] } ,prequisite course name: {prequisite_course.serialize()['course_name']} "
        return prequisite.serialize()

    def post_prequisite(self, prequisite):
        new_prequisite = Prerequiste(**prequisite)
        try:
            Prerequiste.insert(new_prequisite)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_prequisite

    def delete_prequisite(self, course_id):
        try:
            to_be_deleted = Prerequiste.query.filter_by(course_code=course_id).first()
            Prerequiste.delete(to_be_deleted)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if not to_be_deleted:
            raise ErrorHandler({"description": "prequisite does not exist", "status_code": 404})
        return

    def update_prerequisite(self, course_id, new_prerequisite):
        try:
            updated_prerequisite = Prerequiste.query.filter_by(course_code=course_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if not updated_prerequisite:
            raise ErrorHandler({
                "description": "prerequisite does not exist",
                "status_code": 404
                })
        updated_prerequisite = Prerequiste(**new_prerequisite)
        updated_prerequisite.update()
        return updated_prerequisite.serialize()

    def retrieve_all(self):
        try:
            prequisites = Prerequiste.query.all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data = [prequisite.serialize() for prequisite in prequisites]
        return data
