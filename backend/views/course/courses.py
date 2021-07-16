from os import stat
from controllers.course.courses import courses_controller
from controllers.relations.teaches import professor_course_relation_controller
from controllers.relations.learns import student_course_relation_controller
from controllers.relations.group_course_relation import group_course_controller
from controllers.course.group_project import GroupProjectController
from controllers.relations.has_prerequisites import prequisite_controller
from controllers.relations.finished import finished_relation_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify
from datetime import datetime

controller_object = courses_controller()
professor_controller_object = professor_course_relation_controller()
student_controller_object = student_course_relation_controller()
group_course_object = group_course_controller()
group_object = GroupProjectController()
prequisite_object = prequisite_controller()
finished_object = finished_relation_controller()

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
            'course_description': args['course_description'],
            'post_owner_id': args['post_owner_id']

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
        self.reqparse.add_argument(
            'course_description', type=str, location='json')
        self.reqparse.add_argument('doctors', type=list, location='json')

    def get(self):
        try:
            courses = controller_object.get_all_courses()
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'status_code': 200,
            'courses': courses
        })

    def post(self):
        args = self.reqparse.parse_args()
        course = {
            'course_code': args['course_code'],
            'course_name': args['course_name'],
            'weekly_hours': args['weekly_hours'],
            'group_number': args['group_number'],
            'max_students': args['max_students'],
            'course_description': args['course_description']
        }
        doctors = args['doctors']
        try:
            course = controller_object.post_course(course)
            for doc in doctors:
                professor_controller_object.post_professor_course_relation({
                    'professor_id': doc,
                    'course_code': course
                })
            for group in range(args['group_number']):
                gid = group_object.insert_group({
                    "group_name": f'{args["course_code"]} - Section {group+1}',
                    "group_description": f'This is the Group for Section {group+1} of the {args["course_name"]} Course',
                })
                group_course_object.add_group_course(course=course, group=gid)
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
                student_courses = student_controller_object.get_courses_by_student_id(
                    user_id)
            except ErrorHandler as e:
                return e.error
            data_array = list()
            for i in range(len(student_courses)):
                prof = professor_controller_object.get_teachers(
                    student_courses[i]['course_code'])
                data_array.append({
                    'course_code': student_courses[i]['course_code'],
                    'course_name': student_courses[i]["course_name"],
                    'course_description': student_courses[i]["course_description"],
                    'post_owner_id': student_courses[i]["post_owner_id"],
                    'professors': [p for p in prof]
                })
                
            return jsonify({
                'status_code': 200,
                'courses': data_array
            })
        elif role == 'professor':
            try:
                professor_courses = professor_controller_object.get_courses_by_professor_id(
                    user_id)
            except ErrorHandler as e:
                return e.error
            data_array = list()
            for i in range(len(professor_courses)):
                print(professor_courses[i])
                data_array.append(professor_courses[i])
            return jsonify({
                'status_code': 200,
                'courses': data_array
            })

# /courses/search


class SearchCourseByName(Resource):
    method_decorators = {'get': [requires_auth_identity('')]}
    # def __init__(self):
    #     self.reqparse = reqparse.RequestParser()
    #     self.reqparse.add_argument('course_name', type=str, location='json')

    def get(self, user_id, role, name):
        # args = self.reqparse.parse_args()
        # course_name=args['course_name']
        try:
            temp = controller_object.search_for_a_course(name)
            for Course in temp:
                prof = professor_controller_object.get_teachers(
                    Course['course_code'])
                Course['professors'] = [p['name'] for p in prof]
                stud = student_controller_object.get_students_in_course(
                    Course['course_code'])
                inside = False
                for p in prof:
                    if int(p['user_id']) == int(user_id):
                        inside = True
                        break

                if not inside:
                    for s in stud:
                        if int(s['user_id']) == int(user_id):
                            inside = True
                            break
                Course['status'] = 'Enrolled' if inside else "Not Enrolled"
            return {"data":temp, "status_code":200}
        except ErrorHandler as e:
            return e.error

#/course/<cid>/status
class CourseStatus(Resource):
    method_decorators = {'get': [requires_auth_identity("")]}
    def get(self, user_id, role, cid):
        """
        docstring
        """
        status = "Can Enroll"
        try:
            #to handle deadline
            course = controller_object.get_course(cid)
            ###
            if course['course_code']==cid and datetime.now() > datetime.strptime(course['course_deadline'], '%Y-%m-%d %H:%M:%S'):
                    status="Too Late"
            if status == 'Can Enroll':
                fcourses = finished_object.get_finished_courses(user_id)
                pre = prequisite_object.get_one_course_all_prequisites(cid)
                for course in pre:
                    if fcourses.count(course['course_code'])==0:
                        status="Can't Enroll"
                        break
                    
            return {"status": status, "status_code": 200}
        except ErrorHandler as e:
                return e.error
        