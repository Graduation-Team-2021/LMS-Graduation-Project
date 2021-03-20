from controllers.relations.learns import student_course_relation_controller
from controllers.course.courses import courses_controller
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = student_course_relation_controller()


# /student/<student_id>/courses
class Student_Course_Relation(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type=str, location='json')
        self.reqparse.add_argument('Authorization', type=str, location='headers')

    def get(self, student_id):
        try:
            student_courses = controller_object.get_courses_by_student_id(student_id)
        except ErrorHandler as e:
            return e.error
        if student_courses:
            return jsonify({
                'courses': student_courses,
                'status_code': 200
            })
        else:
            return jsonify({'message': 'This student does not have any courses.'})

    def post(self, student_id):
        args = self.reqparse.parse_args()
        student_course_relation = {
            'course_code': args['course_code'],
            'student_id': student_id
        }
        try:
            controller_object.post_student_course_relation(student_course_relation)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Course added successfully',
            'status_code': 200
        })


# /student/<student_id>/courses/<course_code>
class Student_Courses_Relation(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('student_id', type=str, location='json')
        self.reqparse.add_argument('course_code', type=str, location='json')

    def put(self,student_id,course_code):
        args = self.reqparse.parse_args()
        new={'student_id':args['student_id'],'course_code':args['course_code']}
        try:
            controller_object.update_student_course_relation(student_id,course_code,new)
        except ErrorHandler as e:
            return e.error
        return jsonify(
            {
                'message':'relation updated successfully',
                'status_code':200
            }
        )

    def delete(self, student_id, course_code):
        try:
            controller_object.delete_student_course_relation(student_id, course_code)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Course removed successfully',
            'status_code': 200
        })
