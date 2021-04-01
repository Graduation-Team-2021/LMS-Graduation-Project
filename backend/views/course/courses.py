from controllers.course.courses import courses_controller
from controllers.relations.teaches import professor_course_relation_controller
from controllers.relations.learns import student_course_relation_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = courses_controller()
professor_controller_object = professor_course_relation_controller()
student_controller_object = student_course_relation_controller()


# /courses/<course_code>
class Course(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type=str, location='json')
        self.reqparse.add_argument('course_name', type=str, location='json')
        self.reqparse.add_argument('weekly_hours', type=int, location='json')
        self.reqparse.add_argument('group_number', type=int, location='json')
        self.reqparse.add_argument('max_students', type=int, location='json')

    def get(self, course_code):
        try:
            course = controller_object.get_course(course_code=course_code)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'course': course,
            'status_code': 200
        })

    def delete(self, course_code):
        try:
            course = controller_object.delete_course(course_code=course_code)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'course': course,
            'message': 'Course deleted successfully',
            'status_code': 200
        })

    def put(self, course_code):
        args = self.reqparse.parse_args()
        course = {
            'course_code': course_code,
            'course_name': args['course_name'],
            'weekly_hours': args['weekly_hours'],
            'group_number': args['group_number'],
            'max_students': args['max_students'],
            'course_description':args['course_description'],
            'post_owner_id':args['post_owner_id']

        }
        try:
            course = controller_object.update_course(course_code, course)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'course': course,
            'message': 'Course updated successfully',
            'status_code': 200
        })
        

# /courses
class Courses(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type=str, location='json')
        self.reqparse.add_argument('course_name', type=str, location='json')
        self.reqparse.add_argument('weekly_hours', type=int, location='json')
        self.reqparse.add_argument('group_number', type=int, location='json')
        self.reqparse.add_argument('max_students', type=int, location='json')
        self.reqparse.add_argument('course_description', type=str, location='json')


    def get(self):
        try:
            courses = controller_object.get_all_courses()
        except ErrorHandler as e:
            return e.error
        data=[]
        for i in range(len(courses)):
            print(courses)
            data.append({
                'course_code':courses[i][0],
                'course_name':courses[i][1],
                'course_teacher':courses[i][2],
                'course_description':courses[i][3],
                'post_owner_id':courses[i][4]
            })
        return jsonify({
            'status_code':200,
            'courses':data
        })
    def post(self):
        args = self.reqparse.parse_args()
        course = {
            'course_code': args['course_code'],
            'course_name': args['course_name'],
            'weekly_hours': args['weekly_hours'],
            'group_number': args['group_number'],
            'max_students': args['max_students'],
            'course_description':args['course_description']
        }
        try:
            course = controller_object.post_course(course)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Course created successfully',
            'status_code': 200
        })


# /my_courses
class My_Courses(Resource):
    method_decorators = {'get': [requires_auth_identity("")]}

    def get(self, user_id, role):
        if role == 'student':
            try:
                student_courses = student_controller_object.get_courses_by_student_id(user_id)
            except ErrorHandler as e:
                return e.error
            data_array=list()
            for i in range(len(student_courses)) :
                print(student_courses[i])
                data_array.append({
                    'course_code': student_courses[i][0],
                    'course_name': student_courses[i][1],
                    'course_description': student_courses[i][2],
                    'post_owner_id':student_courses[i][3]

                })
            return jsonify({
            'status_code':200,
            'courses':data_array
        })
        elif role == 'professor':
            try:
                professor_courses = professor_controller_object.get_courses_by_professor_id(user_id)
            except ErrorHandler as e:
                return e.error
            data_array=list()
            for i in range(len(professor_courses)) :
                print(professor_courses[i])
                data_array.append({
                    'course_code': professor_courses[i][0],
                    'course_name': professor_courses[i][1],
                    'course_description': professor_courses[i][2],
                })
            return jsonify({
            'status_code':200,
            'courses':data_array
        })
