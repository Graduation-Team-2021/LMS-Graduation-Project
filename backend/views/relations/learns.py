from controllers.relations.delivers import delivers_controller
from controllers.relations.learns import student_course_relation_controller
from controllers.course.courses import courses_controller
from controllers.relations.student_group_relation import StudentGroupRelationController
from controllers.relations.group_course_relation import group_course_controller
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object = student_course_relation_controller()
delivers_object = delivers_controller()
group_obj = StudentGroupRelationController()
course_obj = courses_controller()
gc_obj = group_course_controller()

# /student/<student_id>/courses


class Student_Course_Relation(Resource):
    method_decorators = {'post': [requires_auth_identity("")]}

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type=str, location='json')

    def get(self, student_id):
        try:
            student_courses = controller_object.get_courses_by_student_id(
                student_id)
        except ErrorHandler as e:
            return e.error
        if student_courses:
            return jsonify({
                'courses': student_courses,
                'status_code': 200
            })
        else:
            return jsonify({'message': 'This student does not have any courses.'})

    def post(self, user_id, role, student_id):
        args = self.reqparse.parse_args()
        student_course_relation = {
            'course_code': args['course_code'],
            'student_id': user_id
        }
        try:
            controller_object.post_student_course_relation(
                student_course_relation)
            number = course_obj.get_course(args['course_code'])["max_students"]
            groups = [g["group_id"]
                      for g in gc_obj.get_all_course_groups(args['course_code'])]
            for g in range(len(groups)):
                if g==(len(groups)-1) or \
                    (g<(len(groups)-1) and \
                        len(group_obj.get_one_group_all_students(groups[g]))<number):
                    group_obj.enroll_in_group(user_id, g)
                    break
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
        self.reqparse.add_argument(
            'mid_term_mark', type=float, location='json')
        self.reqparse.add_argument(
            'final_exam_mark', type=float, location='json')
        self.reqparse.add_argument('Data', type=list, location='json')

    def get(self, student_id, course_code):
        return {"data":controller_object.get_student_marks(student_id, course_code), "status_code":200}

    def post(self, student_id, course_code):
        args = self.reqparse.parse_args()
        student_course_relation = {
            'course_code': course_code,
            'student_id': student_id,
            'mid_term_mark': args['mid_term_mark'],
            'final_exam_mark': args['final_exam_mark']
        }
        try:
            controller_object.post_student_course_relation(
                student_course_relation)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Course added successfully',
            'status_code': 200
        })

    def delete(self, student_id, course_code):
        try:
            controller_object.delete_student_course_relation(
                student_id, course_code)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Course removed successfully',
            'status_code': 200
        })
# /course/<course_code>/students


class All_Students_in_one_course(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('Data', type=list, location='json')

    def get(self, course_code):
        try:
            result = controller_object.get_all_students_in_one_course(
                course_code)
        except ErrorHandler as e:
            return jsonify({
                "error": e.error,
                "status_code": 201})
        return jsonify({
            'names': result,
            'status_code': 200
        })

    def put(self, course_code):
        args = self.reqparse.parse_args()
        for i in args['Data']:
            new = {
                'student_id': i['id'],
                'course_code': course_code,
                'mid_term_mark': i['mid'],
                'final_exam_mark': i['final']
            }
            try:
                controller_object.update_student_course_relation(
                    i['id'], course_code, new)
                delivers_object.update_delivers_relation()
            except ErrorHandler as e:
                return e.error
        return jsonify(
            {
                'message': 'relation updated successfully',
                'status_code': 200
            }
        )
