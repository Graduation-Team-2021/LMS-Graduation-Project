from controllers.relations.user_course_relation  import user_course_relation_controller
from flask_restful   import Resource,reqparse
from flask           import current_app,jsonify

controller_object = user_course_relation_controller()
# /user/courses
class User_Course_Relation(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type = str, location = 'json')

    def get(self):
        user_courses = controller_object.get_courses_by_user_id(2,'student')
        return jsonify({
            'courses':user_courses,
            'status_code': 200
            })
    
    def post(self):
        args = self.reqparse.parse_args()
        role = 'professor'
        user_course_relation = {
            'course_code':  args['course_code'],
            {True: 'student_id', False: 'professor_id'} [role=='student']: args['user_id']
        }
        controller_object.post_user_course_relation(user_course_relation,role)
        return jsonify({
            'message':'Course added successfully',
            'status_code':200
        })

# /user/courses/:course_code
class User_Courses_Relation(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type = str, location = 'json')
    
    def delete(self,course_code):
        role='student'
        user_id=1
        controller_object.delete_course(user_id,course_code,role)
        return jsonify({
            'course':course,
            'message':'Course removed successfully',
            'status_code': 200
        })


    