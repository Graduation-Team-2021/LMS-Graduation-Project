from controllers.user.students import students_controller
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = students_controller()


# /student/<user_id>
class Student(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def get(self, user_id):
        try:
            student = controller_object.get_student(user_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'Student': student,
            'status_code': 200
        })

    def delete(self, user_id):
        try:
            student = controller_object.delete_student(user_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'student': student,
            'message': 'Student deleted successfully',
            'status_code': 200
        })
    # Put and post methods are to be done


# /students
class Students(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def get(self):
        try:
            students = controller_object.get_all_students()
        except ErrorHandler as e:
            return e.error
        return {
            'total_students': len(students),
            'status_code': 200,
            'students': students
        }
