from controllers.course.events import events_controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource,reqparse
from flask import current_app,jsonify,send_from_directory
import werkzeug

controller_object = events_controller()


#/course/<course_code>/events/<id>
class Event(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('event_id', type = int, location = 'json')
        self.reqparse.add_argument('event_name', type = str, location = 'json')
        self.reqparse.add_argument('event_date', type = str, location = 'json') #FIXME: need to be checked TODO: Search about converting from UTC string to datetime
        self.reqparse.add_argument('course_code', type = str, location = 'json')
        self.reqparse.add_argument('max_students', type =int, location = 'json')

    
    
    def delete(self,course_code,id):
        try:
            event = controller_object.delete_Event(event_id=id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message':'event deleted successfully',
            'status_code': 200
        })
    
    def put(self,course_code,id):
        args = self.reqparse.parse_args()
        event = {
            'event_name': args['event_name'],
            'course_event': course_code, #course event is the course code to which the events belong
            'event_type': args['event_type'],
            'downloadable': args['downloadable'],
            'file_path': args['file_path'],
            'students_number': args['students_number'],
            "event_id":id   
        }
        try:
            mateiral = controller_object.update_event(id,event)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message':'event updated successfully',
            'status_code':200
        })

# /courses/<course_code>/events
class Events(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('event_id', type = int, location = 'json')
        self.reqparse.add_argument('event_name', type = str, location = 'json')
        self.reqparse.add_argument('event_date', type = str, location = 'json') #FIXME: need to be checked TODO: Search about converting from UTC string to datetime
        self.reqparse.add_argument('course_code', type = str, location = 'json')
        self.reqparse.add_argument('max_students', type =int, location = 'json')


    def get(self,course_code):
        try:
            events = controller_object.get_Events(course_code) 
        except ErrorHandler as e:
            return e.error
        return {
            'status_code':200,
            'events':events
            }

    def post(self,course_code):
        args = self.reqparse.parse_args()
        events = {
            'course_material': course_code, #course material is the course code to which the events belong
            'material_name': args['material_name'],
            'material_type': args['material_type'],
            'downloadable': args['downloadable'],
            'file_path': args['file_path'],
            'students_number': args['students_number']            
        }
        try:
            events = controller_object.post_events(events)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message':'events created successfully',
            'status_code':200
        }) 