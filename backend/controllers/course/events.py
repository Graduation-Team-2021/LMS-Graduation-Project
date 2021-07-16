from models.course.events import Events
from models.user.students import Student
from models.relations.learns import Learns_Relation
from models.course.courses import Course
from methods.errors import *
from flask import current_app, send_from_directory, json
import os
from datetime import datetime


class events_controller():
    def get_Events(self, course_code):
        try:
            events = Events.query.filter_by(course_code=course_code).all()
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
            if event["event_type"] != to_be_updated_Event.event_type:
                Events.delete(to_be_updated_Event)
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
            new_Event = Events(**Event)
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

    def get_most_recent_event(self,student_id):
        course_codes=Student.query.join(Learns_Relation).filter(Student.user_id==Learns_Relation.student_id).\
        join(Course).filter(Learns_Relation.course_code==Course.course_code).\
        with_entities(Course.course_code)

        desired_course_codes=[c for c in course_codes]

        desired_events=[]
        for i in range(len(desired_course_codes)):
            events=Events.query.filter(Events.course_code==desired_course_codes[i][0],str(Events.event_date)>str(datetime.now())).first()
            if events: 
                events=events.serialize()
                desired_events.append(events)
            # desired_events.sort(reverse=True)
        # for i in range(len(desired_events)):
            # x=(sorted(desired_events[i]))
            # sorted_by_date={k:v for k,v in sorted(desired_events[i].items(),key=lambda v:v[1])}
        # one_last_event=Events.query.filter(str(Events.event_date)==(desired_events[0])).first().serialize()
        # return one_last_event
        # # return desired_events[0].replace)
        # return Events.query.filter(Events.event_id==1).first().serialize()
            # sorted_by_date=sorted(desired_events[i])

            # print(desired_events[i]["event_date"])
        print(len(desired_events))
        if len(desired_events)!=0:
            newlist = sorted(desired_events, key=lambda k: k['event_date']) 
            return newlist[0]
        else:
            raise ErrorHandler({
                'description': "No Events So Far",
                'status_code': 202
            })
        