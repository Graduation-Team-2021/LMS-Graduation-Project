from models.course.exams.student_questions import Student_Questions
from controllers.course.exams.student_answers import student_answers_controller
from methods.errors import *

student_answers_object = student_answers_controller()
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
    
    def delete_student_question(self,student_id,question_id):
        try:
            student_question = Student_Questions.query.filter_by(student_id=student_id,question_id=question_id).first()
            if student_question is None:
                raise ErrorHandler({
                'description': 'Exam does not exist.',
                'status_code': 404
            })
            Student_Questions.delete(student_question)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return
     
    def add_student_answer(self,student_id,question_id,student_answers):
        try:
            new_student_question = {
                "student_id":student_id,
                "question_id": question_id
            }
            self.post_student_question(new_student_question)
            student_question_id = self.get_student_question(student_id,question_id).student_question_id
            for student_answer in student_answers:
                new_student_answer = {
                "student_question_id":student_question_id,
                "student_answer":student_answer
                }
                student_answers_object.post_student_answer(new_student_answer)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })  
        return
    


   
    
     

    


   
