from controllers.course.courses import courses_controller
from controllers.relations.professor_course_relation  import professor_course_relation_controller
from controllers.relations.student_course_relation  import student_course_relation_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource,reqparse
from flask import current_app,jsonify

controller_object = courses_controller()
professor_controller_object = professor_course_relation_controller()
student_controller_object = student_course_relation_controller()

# /courses/:course_code
class Course(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type = str, location = 'json')
        self.reqparse.add_argument('course_name', type = str, location = 'json')
        self.reqparse.add_argument('weekly_hours', type = int, location = 'json')
        self.reqparse.add_argument('group_number', type = int, location = 'json')
        self.reqparse.add_argument('max_students', type = int, location = 'json')

    def get(self,course_code):
        try:
            course = controller_object.get_course(course_code=course_code)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'course':course,
            'status_code': 200
            })
    
    def delete(self,course_code):
        try:
            course = controller_object.delete_course(course_code=course_code)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'course':course,
            'message':'Course deleted successfully',
            'status_code': 200
        })
    
    def put(self,course_code):
        args = self.reqparse.parse_args()
        course = {
            'course_code': args['course_code'],
            'course_name': args['course_name'],
            'weekly_hours': args['weekly_hours'],
            'group_number': args['group_number'],
            'max_students': args['max_students'],
        }
        try:
            course = controller_object.update_course(course_code,course)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'course':course,
            'message':'Course updated successfully',
            'status_code':200
        })
        
    
#/courses
class Courses(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type = str, location = 'json')
        self.reqparse.add_argument('course_name', type = str, location = 'json')
        self.reqparse.add_argument('weekly_hours', type = int, location = 'json')
        self.reqparse.add_argument('group_number', type = int, location = 'json')
        self.reqparse.add_argument('max_students', type = int, location = 'json')

    def get(self):
        try:
            courses = controller_object.get_all_courses()
        except ErrorHandler as e:
            return e.error
        return {
            'total_courses':len(courses),
            'status_code':200,
            'course':courses
            }

    def post(self):
        args = self.reqparse.parse_args()
        course = {
            'course_code': args['course_code'],
            'course_name': args['course_name'],
            'weekly_hours': args['weekly_hours'],
            'group_number': args['group_number'],
            'max_students': args['max_students'],
        }
        try:
            course = controller_object.post_course(course)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message':'Course created successfully',
            'status_code':200
        })

class My_Courses(Resource):
    method_decorators = {'get': [requires_auth_identity("")]}
    def get(self,user_id,role):
        if role == 'student':
            try:
                student_courses = student_controller_object.get_courses_by_student_id(user_id)
            except ErrorHandler as e:
                return e.error
            return jsonify({
                'courses':student_courses,
                'status_code': 200
                })
        elif role == 'professor':
            try:
                professor_courses = professor_controller_object.get_courses_by_professor_id(user_id)
            except ErrorHandler as e:
                return e.error
            return jsonify({
                'courses':professor_courses,
                'status_code': 200
                })






    
    