from backend.controllers.courses import courses_controller
from flask_restful import Resource,reqparse
from flask import current_app,jsonify

# /courses/:course_code
class Course(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.controller_object = courses_controller()
        self.reqparse.add_argument('course_code', type = str, location = 'json')
        self.reqparse.add_argument('course_name', type = str, location = 'json')
        self.reqparse.add_argument('weekly_hours', type = int, location = 'json')
        self.reqparse.add_argument('group_number', type = int, location = 'json')
        self.reqparse.add_argument('max_students', type = int, location = 'json')

    def get(self,course_code):
        course = self.controller_object.get_course(course_code=course_code)
        return jsonify({
            'course':course,
            'status_code': 200
            })
    
    def delete(self,course_code):
        course = self.controller_object.delete_course(course_code=course_code)
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
        course = self.controller_object.update_course(course_code,course)
        return jsonify({
            'course':course,
            'message':'Course updated successfully',
            'status_code':200
        })
        
    
#/courses
class Courses(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.controller_object = courses_controller()
        self.reqparse.add_argument('course_code', type = str, location = 'json')
        self.reqparse.add_argument('course_name', type = str, location = 'json')
        self.reqparse.add_argument('weekly_hours', type = int, location = 'json')
        self.reqparse.add_argument('group_number', type = int, location = 'json')
        self.reqparse.add_argument('max_students', type = int, location = 'json')

    def get(self):
        courses = self.controller_object.get_all_courses()
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
        course = self.controller_object.post_course(course)
        return jsonify({
            'course':course,
            'message':'Course created successfully',
            'status_code':200
        })
    
    