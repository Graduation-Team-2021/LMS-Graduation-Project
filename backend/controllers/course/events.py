from models.course.events import Events
from methods.errors import *
from flask import current_app, send_from_directory, json
import os


class events_controller():
    def get_Events(self, course_code):
        try:
            events = Events.query.filter_by(course_code=course_code).all()
            # TODO: Handle SQLAlchemyError
            if not events:
                raise ErrorHandler({
                    'description': 'Events do not exist.',
                    'status_code': 404
                })
            for event in events:
                event.event_date = json.dumps(event.event_date, default=str).replace("\"", "")
            data = [event.serialize() for event in events]
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return data

    def get_Event(self, course_code, event_id):
        try:
            event = Events.query.filter_by(event_id=event_id, course_code=course_code).first()
            if event is None:
                raise ErrorHandler({
                    'description': 'event does not exist for this specific course',
                    'status_code': 404
                })
            event.event_date = json.dumps(event.event_date, default=str).replace("\"", "")
            # TODO: Handle SQLAlchemyError
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return event.serialize()

    def delete_Event(self, course_code, event_id):
        try:
            deleted_Event = Events.query.filter_by(course_code=course_code, event_id=event_id).first()
            if deleted_Event is None:
                raise ErrorHandler({
                    'description': 'Event does not exist.',
                    'status_code': 404
                })
            Events.delete(deleted_Event)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def update_event(self, event_id, event):
        to_be_updated_Event = Events.query.filter_by(event_id=event_id).first()
        if to_be_updated_Event is None:
            raise ErrorHandler({
                'description': 'Event does not exist.',
                'status_code': 404
            })
        try:
            updated_Event = Events(**event)
            updated_Event.update()
            updated_Event.event_date = json.dumps(updated_Event.event_date, default=str)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return updated_Event.serialize()

    def post_Event(self, Event):
        try:
            new_Event= Events(**Event)
            new_Event = Events.insert(new_Event)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_Event

    def upload_event(self, data, course_code):
        event_type = data.content_type.split("/")[1]
        file_path = os.path.join(current_app.config['STATIC_PATH'], f"courses\{course_code}", f"Events\{event_type}")
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        file_path = os.path.join(file_path, data.filename)
        data.save(file_path)
        return