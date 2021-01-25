from models.course.exams.questions import Questions
from models.course.exams.answers   import Answers
from models.course.events          import Events
from methods.errors import *


class questions_controller():
    def get_all_questions(self, event_id):
        questions_formatted = []
        try:
            questions = Questions.query.join(Events).filter(
                        Events.event_id == Questions.event_id
                    ).join(Answers).filter(
                        Questions.question_id == Answers.question_id
                    ).with_entities(Questions.question,Answers.answer,Answers.right_answer,Questions.question_id,Answers.answer_id,Questions.mark).all()
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
            index = next((index for (index, d) in enumerate(questions_formatted) if d["question"] == i[0]), None)
            if index is None:
                questions_formatted.append(
                    {"question": i[0], 
                    "question_id": i[3],
                    "answers":[{"answers": i[1], "right_answer": i[2]
                    ,"answer_id": i[4],"mark": i[5]
                }]})
            else:
                questions_formatted[index]['answers'].append({"answers": i[1], "right_answer": i[2]
                ,"answer_id": i[4],"mark": i[5]})    
            
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
            question["event_id"] = updated_question.event_id
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
