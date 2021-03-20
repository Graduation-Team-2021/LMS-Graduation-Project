from models.course.exams.answers import Answers
from methods.errors import *


class answers_controller():
    def get_answer(self, answer_id):
        try:
            answer = Answers.query.filter_by(answer_id=answer_id).first()
            if not answer:
                raise ErrorHandler("answer does not exist")
            return answer.serialize()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })

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

    def get_all_correct_answers(self, question_id):
        try:
            correct_answers = Answers.query.filter_by(question_id=question_id, right_answer=1).all()
            answers = [correct_answer.serialize() for correct_answer in correct_answers]
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return answers

    def get_all_wrong_answers(self, question_id):
        try:
            wrong_answers = Answers.query.filter_by(question_id=question_id, right_answer=0).all()
            answers = [wrong_answer.serialize() for wrong_answer in wrong_answers]
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return answers
