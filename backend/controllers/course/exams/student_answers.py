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

   
