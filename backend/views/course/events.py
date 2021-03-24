from controllers.course.events import events_controller
from methods.errors import *
from methods.auth import *

from flask_restful import Resource, reqparse
from flask import current_app, jsonify, send_from_directory

import werkzeug

controller_object = events_controller()


# /course/<course_code>/events/<id>
class Event(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('event_name', type=str, location='json')
        self.reqparse.add_argument('event_date', type=str,
                                   location='json')  # FIXME: need to be checked TODO: Search about converting from UTC string to datetime
        self.reqparse.add_argument('event_type', type=str, location='json')
        self.reqparse.add_argument('event_duration', type=int, location='json')

    def get(self, course_code, event_id):
        try:
            event = controller_object.get_Event(course_code, event_id)
        except ErrorHandler as e:
            return e.error
        return event

    def delete(self, course_code, event_id):
        try:
            controller_object.delete_Event(course_code=course_code, event_id=event_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'event deleted successfully',
            'status_code': 200
        })

    def put(self, course_code, event_id):
        args = self.reqparse.parse_args()
        event = {
            "event_id": event_id,
            "event_name": args['event_name'],
            "event_date": args['event_date'],
            "course_code": course_code,
            'event_type': args['event_type']
        }
        try:
            controller_object.update_event(event_id, event)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'event updated successfully',
            'status_code': 200
        })


# /courses/<course_code>/events
class Events(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

        self.reqparse.add_argument('event_id', type=int, location='json')
        self.reqparse.add_argument('event_name', type=str, location='json')
        self.reqparse.add_argument('event_date', type=str,
                                   location='json')  # FIXME: need to be checked TODO: Search about converting from UTC string to datetime
        self.reqparse.add_argument('course_code', type=str, location='json')
        self.reqparse.add_argument('event_type', type=str, location='json')
        self.reqparse.add_argument('event_duration', type=int, location='json')

    def get(self, course_code):
        try:
            events = controller_object.get_Events(course_code)
        except ErrorHandler as e:
            return e.error
        return {
            'status_code': 200,
            'events': events
        }

    def post(self, course_code):
        args = self.reqparse.parse_args()
        event_type = args["event_type"]
        if event_type not in ["exam", "lecture"]:
            return jsonify({
                'message': 'incorrect event type',
                'status_code': 404
            })
        event = {
            "event_name": args['event_name'],
            "event_date": args['event_date'],
            "course_code": course_code,
            "event_type": args["event_type"],
            "event_duration": args['event_duration']
        }
        try:
            controller_object.post_Event(event)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'event created successfully',
            'status_code': 200
        })

