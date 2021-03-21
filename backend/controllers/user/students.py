from models.user.students import Student
from models.user.users import User
from methods.errors import *
from models.course.deliverables_results import Deliverables_Results
from models.course.deliverables import Deliverables
from models.course.exams.results import Results
from models.relations.learns import Learns_Relation
from models.relations.finished import Finished
from models.course.exams.exam import Exams
from models.course.events import Events


class students_controller():
    def get_student(self, user_id):
        try:
            students = Student.query.join(User).filter(User.user_id == user_id).with_entities(User.name, User.user_id,
                                                                                              User.email,
                                                                                              User.national_id,
                                                                                              User.birthday,
                                                                                              Student.student_year)
        except ErrorHandler as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        student = [student for student in students]
        if not student:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })
        return {'name': student[0][0], 'email': student[0][2], 'national_id': student[0][3],
                'id': student[0][1], 'student_year': student[0][5], "birthday": student[0][4]}
        # return student

    def delete_student(self, user_id):
        try:
            deleted_student = Student.query.filter_by(user_id=user_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if deleted_student is None:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })
        Student.delete(deleted_student)
        return

    def update_student(self, user_id, student):
        try:
            updated_student = Student.query.filter_by(user_id=user_id)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if updated_student is None:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })
        updated_student = Student(**student)
        updated_student.update()
        return updated_student.serialize()

    def post_student(self, student):
        new_student = Student(**student)
        try:
            new_student = Student.insert(new_student)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return new_student

    def get_all_students(self):
        try:
            students = Student.query.all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if students is None:
            raise ErrorHandler({
                'description': 'Students do not exist.',
                'status_code': 404
            })
        data = [student.serialize() for student in students]
        return data

    '''
     Deh el function el btshoof el student da success wla fail f mada mo3aina by summing his course_work and final exam degree
     and comparing it to half the value of the whole course mark
    '''

    def calculate_student_marks(self, student_id, course_code):
        d = Deliverables.query.filter_by(course_deliverables=course_code).with_entities(Deliverables.deliverable_id,
                                                                                        Deliverables.mark)
        data = [r for r in d]
        total_mark_of_deliverables = 0
        total_student_mark_for_deliverables = 0
        for i in data:
            dr = Deliverables_Results.query.filter_by(user_id=student_id, deliverable_id=i[0]).first()
            if dr is not None:
                total_student_mark_for_deliverables += dr.mark
            total_mark_of_deliverables += i[1]
        # return total_mark_of_deliverables
        exam_id = Results.query.join(Exams).filter(Results.exam_id == Exams.exam_id) \
            .join(Events).filter(Exams.event_id == Events.event_id, Events.course_code == course_code).with_entities(
            Results.exam_id).first()
        # return exam_id
        result = Results.query.filter_by(student_id=student_id, exam_id=exam_id[0]).first()
        if (float(result.serialize()["mark"]) + float(total_student_mark_for_deliverables)) > (
                0.5 * (total_mark_of_deliverables + result.serialize()["out_of_mark"])):
            to_be_deleted = Learns_Relation.query.filter_by(student_id=student_id, course_code=course_code).first()
            to_be_deleted.delete()
            done = Finished(course_code=course_code, student_id=student_id)
            done.insert()
            return "Succeeded"
        else:
            return "Failed"

        # results=db.session.query(Events,Exams,Results).\
        #     select_from(Results).join(Events).join(Exams).\
        #     filter(Events.event_id==Exams.event_id,Results.exam_id==Exams.exam_id)\
        #     .all()
        # for i in results:
        #     return i.serialize()
        # return Results.query.join(Events).filter(Events.event_id==Exams.event_id).join(Exams).filter(Results.exam_id==Exams.exam_id).with_entities(Results.mark,Results.out_of_mark)
        # return student_mark
        # events=Events.query.filter_by(course_code=course_code,event_type="exam").first()
        # r=Results.query.join(Exams).filter(exam_id=Exams.exam_id).join(Events)
        # ev=r.query.join(Events).filter(event_id=Exams.event_id)
        # return ev
        # Results.query.filter_by(student_id=student_id,exam_id)
        #
        #
        # deliverable_result = Deliverables_Results.query.filter_by(user_id=student_id,
        #                                                           deliverable_id=d.deliverable_id).first()
        # exam_result=Results.query.filter_by(student_id=student_id,exam_id=exam_id).first()
        # actual_mark=Exams.query.filter_by(exam_id=exam_id).first()
        # if (float(deliverable_result)+float(exam_result))>(0.5*actual_mark):
        #     Learns_Relation.query.filter_by(student_id=student_id,course_code=course_code).delete()
        #     done=Finished(course_code,student_id)
        #     Finished.insert(done)
