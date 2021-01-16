from controllers.course.courses import courses_controller
from methods.errors import ErrorHandler
from flask_restful                      import Resource,reqparse
from flask                              import current_app,jsonify

controller_object = courses_controller()

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
        course = controller_object.post_course(course)
        return jsonify({
            'course':course,
            'message':'Course created successfully',
            'status_code':200
        })




    
    