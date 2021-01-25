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
    
    def delete_answer(self, answer_id):
        try:
            deleted_answer = Answers.query.filter_by(answer_id=answer_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if deleted_answer is None:
            raise ErrorHandler({
                'description': 'Answer does not exist.',
                'status_code': 404
            })
        Answers.delete(deleted_answer)
        return
    
    def update_answer(self, answer_id, answer):
        try:
            updated_answer = Answers.query.filter_by(answer_id=answer_id).first()
            if updated_answer is None:
                raise ErrorHandler({
                    'description': 'Answer does not exist.',
                    'status_code': 404
                })
            answer["question_id"] = updated_answer.question_id
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        
        updated_answer = Answers(**answer)
        updated_answer.update()
        return 
