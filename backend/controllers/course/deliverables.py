from methods.errors import *
import os
from flask import current_app, send_file, send_from_directory
from models.course.courses import Course
from models.course.deliverables import Deliverables
from models.course.events import Events
from models.relations.delivers import Deliver
from models.relations.learns import Learns_Relation
from models.relations.group_course_relation import GroupCourseRelation
from models.relations.student_group_relation import StudentGroupRelation
from models.relations.group_deliverable_relation import GroupDeliverableRelation
from models.relations.teaches import Teaches_Relation
from models.course.deliverables_results import Deliverables_Results
from models.user.students import Student
from models.user.professors import Professor
from models.course.group_project import GroupProject
from models.user.users import User
from controllers.relations.delivers import delivers_controller
from controllers.course.group_project import GroupProjectController
from controllers.course.events import events_controller
from controllers.relations.group_course_relation import group_course_controller
from flask import json
from datetime import datetime
from sqlalchemy import func
import math

delivers_controller_object = delivers_controller()
groups_controller = GroupProjectController()
events_controllers = events_controller()
group_course_controller_object = group_course_controller()

class deliverable_controller:
    def get_deliverable(self, deliverable_id):
        deliverable = Deliverables.query.filter_by(
            deliverable_id=deliverable_id).first()
        if not deliverable:
            raise ErrorHandler({
                'description': 'deliverable does not exist.',
                'status_code': 404
            })
        deliverable.deadline = json.dumps(
            deliverable.deadline, default=str).replace("\"", "")
        return deliverable.serialize()

    def post_deliverable(self, deliverable):
        new_deliverable = Deliverables(**deliverable)
        try:
            new_deliverable = Deliverables.insert(new_deliverable)
            deliverable = Deliverables.query.order_by(Deliverables.deliverable_id.desc()).first()
            deliverable_id = deliverable.serialize()['deliverable_id']
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return deliverable_id

    def delete_deliverable(self, deliverable_id):
        deliverable_to_be_deleted = Deliverables.query.filter_by(
            deliverable_id=deliverable_id).first()
        try:
            Deliverables.delete(deliverable_to_be_deleted)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return True

    def create_groups_for_deliverable(self,deliverable_id,course_code):
        student_number = deliverable = Deliverables.query.filter_by(
            deliverable_id=deliverable_id).first().serialize()['students_number']
        total_number_of_students = Learns_Relation.query.filter_by(course_code=course_code).with_entities(func.count(Learns_Relation.course_code)).group_by(Learns_Relation.course_code).all()[0][0]
        number_of_groups = math.ceil(total_number_of_students/student_number)
        course = Course.query.filter_by(course_code=course_code).first().serialize()
        if student_number > 1:
            for i in range(number_of_groups):
                new_group = {
                    'group_name':course['course_code']+"_"+str(i) 
                }
                groups_controller.insert_group(new_group)
                new_group = GroupProject.query.order_by(GroupProject.group_id.desc()).first().serialize()
                group_course_controller_object.add_group_course(course_code,new_group['group_id'])
                group_deliverable = {
                    'group_id':new_group['group_id'],
                    'deliverable_id': deliverable_id
                }
                GroupDeliverableRelation.insert(GroupDeliverableRelation(**group_deliverable))
                
    
    def create_deliverable_event(self,course_code,deliverable):
        event = {
            "event_name": deliverable['deliverable_name'],
            "event_date": deliverable['deadline'],
            "course_code": course_code,
            "event_duration": 5,
            "event_type": "deliverable"
        }
        try:
            events_controllers.post_Event(event)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return True


    def update_deliverable(self, deliverable_id, deliverable):
        old_deliverable = Deliverables.query.filter_by(
            deliverable_id=deliverable_id).first()
        if not old_deliverable:
            raise ErrorHandler({
                'description': 'deliverable does not exist.',
                'status_code': 404
            })
        updated_deliverable = Deliverables(**deliverable)
        updated_deliverable.update()
        return updated_deliverable.serialize()

    def get_one_student_all_deliverables(self, student_id):
        try:
            if not Student.query.filter_by(user_id=student_id).first():
                raise ErrorHandler({
                    "message": "student does not exist",
                    "status code": 404
                })
            deliverables_list = []
            all_deliverables = Deliverables.query.join(Course).join(Learns_Relation).filter(
                Course.course_code == Deliverables.course_deliverables).filter(
                Learns_Relation.student_id == student_id
            ).filter(Learns_Relation.course_code == Course.course_code).with_entities(
                Deliverables.deliverable_id, Deliverables.deliverable_name, Deliverables.course_deliverables,
                Deliverables.deadline, Course.course_name, Deliverables.description, Deliverables.mark)
            for i in all_deliverables:
                delivers_relation = Deliver.query.filter(Deliver.deliverable_id == i.deliverable_id).filter(
                    Deliver.student_id == student_id).first()
                status = ""
                if(datetime.now() > i.deadline):
                    status = "Completed"
                elif(delivers_relation is not None):
                    status = "In Progress"
                else:
                    status = "Not Started"
                index = next((index for (index, d) in enumerate(
                    deliverables_list) if d["course_id"] == i[2]), None)
                student_group = StudentGroupRelation.query.filter(StudentGroupRelation.student_id==student_id).all()
                deliverable_group = GroupDeliverableRelation.query.filter(GroupDeliverableRelation.deliverable_id==i.deliverable_id).all()
                deliverable_group_formatted = []
                student_group_formatted = []
                for j in student_group:
                    student_group_formatted.append(j.serialize())
                for j in deliverable_group:
                    deliverable_group_formatted.append(j.serialize())
                group_id = None
                for k in deliverable_group_formatted:
                    for j in student_group_formatted:
                        if k['group_id']==j['group_id']:
                            group_id = k['group_id']
                            break

                if index == None:
                    deliverables_list.append(
                        {"course_id": i[2], "course_name": i[4], "deliverables":
                            [{"deliverable_id": i[0], "deliverable_name": i[1],
                              "description": i[5],
                              "mark": i[6],
                              "deadline": json.dumps(i[3], default=str).replace("\"", ""),
                              "status":status,
                              "group_id":group_id}]})
                else:
                    deliverables_list[index]['deliverables'].append({"deliverable_id": i[0],
                                                                     "deliverable_name": i[1],
                                                                     "description": i[5],
                                                                     "mark": i[6],
                                                                     "deadline": json.dumps(i[3], default=str).replace(
                                                                         "\"", ""),
                                                                     "status": status,
                                                                     "group_id":group_id})
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return {"courses_deliverables": deliverables_list}

    def get_all_course_deliverables(self, course_code, user_id, role):
        #TODO: edit to get for doctor
        try:
            deliverable = Deliverables.query.filter_by(
                course_deliverables=course_code).all()
            deliverables_formatted = []
            deliverables_modified = []
            for i in deliverable:
                deliverables_formatted.append(i.serialize())
            for i in deliverables_formatted:
                delivers_relation = Deliver.query.filter(
                    Deliver.deliverable_id == i['deliverable_id']).filter(Deliver.student_id == user_id).first()
                status = ""
                if(datetime.now() > i['deadline']):
                    status = "Completed"
                elif(delivers_relation is not None):
                    status = "In Progress"
                else:
                    status = "Not Started"
                i['status'] = status
                deliverables_modified.append(i)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return deliverables_modified

    def get_all_deliverables_by_deliverable_id(self, deliverable_id):
        try:
            all_deliverables = Student.query.join(Deliver).join(User).filter(
                Deliver.student_id == Student.user_id).filter(
                User.user_id == Student.user_id
            ).filter(Deliver.deliverable_id == deliverable_id).group_by(
                User.user_id).with_entities(
                User.user_id, User.name, User.email)
            all_deliverables_list = []
            for i in all_deliverables:
                deliverable_result = Deliverables_Results.query.filter(deliverable_id == deliverable_id).filter(
                    Deliverables_Results.user_id == i[0]).first()
                if not deliverable_result:
                    mark = None
                else:
                    mark = deliverable_result.mark
                all_deliverables_list.append({
                    'user_id': i[0],
                    'name': i[1],
                    'email': i[2],
                    'mark': mark
                })

        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return all_deliverables_list

    def get_one_professor_all_deliverables(self, professor_id):
        try:
            if not Professor.query.filter_by(user_id=professor_id).first():
                raise ErrorHandler({
                    "message": "professor does not exist",
                    "status code": 404
                })
            deliverables_list = []
            all_deliverables = Deliverables.query.join(Course).join(Teaches_Relation).filter(
                Course.course_code == Deliverables.course_deliverables).filter(
                Teaches_Relation.professor_id == professor_id
            ).filter(Teaches_Relation.course_code == Course.course_code).with_entities(
                Deliverables.deliverable_id, Deliverables.deliverable_name, Deliverables.course_deliverables,
                Deliverables.deadline, Course.course_name, Deliverables.description, Deliverables.mark)
            for i in all_deliverables:
                index = next((index for (index, d) in enumerate(
                    deliverables_list) if d["course_id"] == i[2]), None)
                unsolved_count = delivers_controller_object.count_number_of_ungraded_deliverables(
                    i[0])
                if index == None:
                    deliverables_list.append(
                        {"course_id": i[2], "course_name": i[4], "deliverables":
                            [{"deliverable_id": i[0], "deliverable_name": i[1],
                              "description": i[5],
                              'unsolved_deliverables': unsolved_count,
                              "mark": i[6],
                              "deadline": json.dumps(i[3], default=str).replace("\"", "")}]})
                else:
                    deliverables_list[index]['deliverables'].append({"deliverable_id": i[0],
                                                                     "deliverable_name": i[1],
                                                                     "description": i[5],
                                                                     'unsolved_deliverables': unsolved_count,
                                                                     "mark": i[6],
                                                                     "deadline": json.dumps(i[3], default=str).replace(
                                                                         "\"", "")})
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return {"courses_deliverables": deliverables_list}
