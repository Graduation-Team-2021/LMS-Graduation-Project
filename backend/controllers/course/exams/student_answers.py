from models.course.exams.student_answers import Student_Answers
from methods.errors import *


class student_answers_controller():
    def post_student_answer(self, student_answer):
        try:
            student_answer = Student_Answers(**student_answer)
            student_answer = Student_Answers.insert(student_answer)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return 

    def delete_all_student_answers(self,student_question_id):
        try:
            student_answers = Student_Answers.query.filter(student_question_id==student_question_id).delete(synchronize_session=False)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })  
        return

    def update_student_answer(self,student_id,question_id,student_answers,student_question_id):
        try:
            self.delete_all_student_answers(student_question_id)
            for student_answer in student_answers:
                updated_student_answer = {
                "student_question_id":student_question_id,
                "student_answer":student_answer
                }
                self.post_student_answer(updated_student_answer)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })  
        return
    def get_student_answer_with_student_question_id_and_answer(self,student_question_id,answer):
        try:
            student_answer = Student_Answers.query.filter(student_question_id==student_question_id,answer==answer).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })  
        return student_answer.serialize()
    def update_one_student_answer(self,student_answer_id,correct_answer):
        try:
            student_answer = Student_Answers.query.filter(student_answer_id == student_answer_id).first()
            student_answer.correct_answer = correct_answer
            student_answer.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })  


   
