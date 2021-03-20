from models.course.exams.questions import Questions
from models.course.exams.answers import Answers
from models.course.events import Events
from models.course.exams.exam import Exams
from methods.errors import *


class questions_controller():
    def get_all_questions(self, exam_id):
        questions_formatted = []
        try:
            answers = Questions.query.join(Exams).filter(
                Questions.exam_id == exam_id
            ).join(Answers).filter(
                Questions.question_id == Answers.question_id
            ).with_entities(Answers.answer, Answers.right_answer, Answers.answer_id, Questions.question_id).all()
            questions = Questions.query.join(Exams).filter(
                Questions.exam_id == exam_id
            ).with_entities(Questions.question, Questions.question_id, Questions.mark).all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if questions is None:
            raise ErrorHandler({
                'description': 'Questions do not exist.',
                'status_code': 404
            })
        for i in questions:
            questions_formatted.append(
                {"question": i[0],
                 "question_id": i[1],
                 "mark": i[2],
                 "answers": []})

        for i in answers:
            index = next((index for (index, d) in enumerate(questions_formatted) if d["question_id"] == i[3]), None)
            questions_formatted[index]['answers'].append({"answers": i[0], "right_answer": i[1]
                                                             , "answer_id": i[3]})

        return questions_formatted

    def delete_question(self, question_id):
        try:
            deleted_question = Questions.query.filter_by(question_id=question_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if deleted_question is None:
            raise ErrorHandler({
                'description': 'Question does not exist.',
                'status_code': 404
            })
        Questions.delete(deleted_question)
        return

    def update_question(self, question_id, question):
        try:
            updated_question = Questions.query.filter_by(question_id=question_id).first()
            if updated_question is None:
                raise ErrorHandler({
                    'description': 'Question does not exist.',
                    'status_code': 404
                })
            question["exam_id"] = updated_question.exam_id
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })

        updated_question = Questions(**question)
        updated_question.update()
        return

    def post_question(self, question):
        try:
            new_question = Questions(**question)
            new_question = Questions.insert(new_question)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_question

    def get_question(self, question_id):
        try:
            question = Questions.query.filter(Questions.question_id == question_id).first()
            if question is None:
                raise ErrorHandler({
                    'description': 'Question does not exist.',
                    'status_code': 404
                })
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return question.serialize()