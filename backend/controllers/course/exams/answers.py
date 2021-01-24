from models.course.exams.answers   import Answers
from methods.errors import *


class answers_controller():

    def post_answer(self, answer):
        try:    
            new_answer = Answers(**answer)
            new_answer = Answers.insert(new_answer)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_answer
