from models.course.exams.exam  import Exams
from methods.errors import *


class exams_controller():

    def post_exam(self, exam):
        try:    
            new_exam = Exams(**exam)
            new_exam = Exams.insert(new_exam)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_exam

    def get_exam(self, exam_id):
        try:
            exam = Exams.query.filter_by(exam_id=exam_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if exam is None:
            raise ErrorHandler({
                'description': 'Exam does not exist.',
                'status_code': 404
            })
        return exam.serialize()
    
    def update_exam(self, exam_id, exam):
        try:
            updated_exam = Exams.query.filter_by(exam_id=exam_id).first()
            if updated_exam is None:
                raise ErrorHandler({
                    'description': 'Exam does not exist.',
                    'status_code': 404
                })
            exam["event_id"] = updated_exam.event_id
            updated_exam = Exams(**exam)
            updated_exam.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            }) 
        return updated_exam.serialize()
    