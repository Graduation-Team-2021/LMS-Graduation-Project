from models.course.exams.student_questions import Student_Questions

from methods.errors import *


class student_questions_controller():
    def post_student_question(self, student_question):
        try:
            student_questions = Student_Questions(**student_question)
            student_questions = Student_Questions.insert(student_questions)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return 
    
    def get_student_question(self,student_id,question_id):
        try:
            student_question = Student_Questions.query.filter_by(student_id=student_id,question_id=question_id).first()
            if student_question is None:
                raise ErrorHandler({
                'description': 'Exam does not exist.',
                'status_code': 404
            })
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return student_question

    


   
