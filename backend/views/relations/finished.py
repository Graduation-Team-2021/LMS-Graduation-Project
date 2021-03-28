from controllers.relations.finished import finished_relation_controller
from methods.errors import *
from flask_restful import Resource, reqparse
from flask import jsonify

controller_object = finished_relation_controller()


# /student/<student_id>/finishedCourses
class finished_relation_view(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type=str, location='json')
        self.reqparse.add_argument('student_id', type=str, location='json')

    def get(self, student_id):
        try:
            finished_courses = controller_object.get_finished_courses(student_id)
            data_list=[]
            for i in range(len(finished_courses)):
                data_list.append(
                    {
                        'course_code':finished_courses[i][0],
                        'course_name':finished_courses[i][1],
                        'course_mark':finished_courses[i][2],
                    }
                )
            if not finished_courses:
                return jsonify({'message': 'No finished courses for this specific student'})
        except ErrorHandler as e:
            return e.error
        return data_list

    def post(self, student_id):
        args = self.reqparse.parse_args()
        course = {"course_code": args["course_code"], "student_id": student_id}
        try:
            controller_object.post_finished_course(course)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'course': course,
            'message': 'course added successfully',
            'status code': 200
        })


# /student/<student_id>/finishedCourses/<course_code>
class finished_relation_using_the_two_keys(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type=str, location='json')
        self.reqparse.add_argument('student_id', type=str, location='json')

    def delete(self, student_id, course_code):
        try:
            course = controller_object.delete_finished_course(student_id, course_code)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'course deleted successfully',
            'status_code': 200
        })

    def put(self, student_id, course_code):
        args = self.reqparse.parse_args()
        new_finished_course = {
            "course_code": args['course_code'],
            "student_id": args['student_id']
        }
        try:
            controller_object.update_finished_course(student_id, course_code,
                                                     new_finished_course)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'Course': new_finished_course,
            'message': 'course updated successfully',
            'status code': 200
        })
#
# # /student/<student_id>/updateFinishedCourses/<course_code>
# class update_finished_course(Resource):
#     # feh moshkela hena , new course doesnot replace the old one but is added to the table
#     def __init__(self):
#         self.reqparse = reqparse.RequestParser()
#         self.reqparse.add_argument('course_code', type=str, location='json')
#         self.reqparse.add_argument('student_id', type=int, location='json')
