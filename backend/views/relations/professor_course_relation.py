from controllers.relations.professor_course_relation  import professor_course_relation_controller
from methods.errors import ErrorHandler
from flask_restful   import Resource,reqparse
from flask           import current_app,jsonify

controller_object = professor_course_relation_controller()
# /professor/<professor_id>/courses
class Professor_Course_Relation(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type = str, location = 'json')

    def get(self,professor_id):
        try:
            professor_courses = controller_object.get_courses_by_professor_id(professor_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'courses':professor_courses,
            'status_code': 200
            })
    
    def post(self,professor_id):
        args = self.reqparse.parse_args()
        professor_course_relation = {
            'course_code':  args['course_code'],
            'professor_id': professor_id
        }
        try:
            controller_object.post_professor_course_relation(professor_course_relation)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message':'Course added successfully',
            'status_code':200
        })

# /professor/<professor_id>/courses/:course_code
class Professor_Courses_Relation(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('course_code', type = str, location = 'json')
    
    def delete(self,course_code,professor_id):
        try:
            controller_object.delete_professor_course_relation(professor_id,course_code)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message':'Course removed successfully',
            'status_code': 200
        })


    