from models.course.events import Events
from methods.errors import *
from flask import current_app,send_from_directory
import os

class events_controller():
    def get_Events(self,course_code):
     events = Events.query.filter_by(course_code=course_code)
     #TODO: Handle SQLAlchemyError 
     if events is None:
        raise ErrorHandler({
                'description':'Events does not exist.',
                'status_code': 404
                })

     data = [event.serialize() for event in events]
     return (data)   
    
    def get_Event(self,event_id):
     event = Events.query.filter_by(event_id=event_id).first()
     #TODO: Handle SQLAlchemyError 
     if event is None:
        raise ErrorHandler({
                'description':'event does not exist.',
                'status_code': 404
                })
     return event.serialize()

    def delete_Event(self,event_id):
        deleted_Event = Events.query.filter_by(event_id=event_id).first()
        if deleted_Event is None:
            raise ErrorHandler({
                'description':'Events does not exist.',
                'status_code': 404
                })
        Events.delete(deleted_Event)
        return 

    def update_event(self,event_id,event):
        updated_Events = Events.query.filter_by(event_id=event_id)
        if updated_Events is None:
            raise ErrorHandler({
                'description':'Events does not exist.',
                'status_code': 404
                })
        updated_Events = Events(**event)
        updated_Events.update()
        return updated_Events.serialize()

    def post_Events(self,Events):
        new_Events = Events(**Events)
        new_Events = Events.insert(new_Events)
        return new_Events
    
    
    def upload_event(self,data,course_code):
       event_type = data.content_type.split("/")[1]
       file_path = os.path.join(current_app.config['STATIC_PATH'],f"courses\{course_code}",f"Events\{event_type}")
       if not os.path.exists(file_path):
                os.makedirs(file_path)
       file_path = os.path.join(file_path,data.filename)
       data.save(file_path)
       return