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

    # def delete_course(self, course_code):
    #     deleted_course = Course.query.filter_by(course_code=course_code).first()
    #     if deleted_course is None:
    #         raise ErrorHandler({
    #             'description': 'Course does not exist.',
    #             'status_code': 404
    #         })
    #     Course.delete(deleted_course)
    #     return

    # def update_course(self, course_code, course):
    #     updated_course = Course.query.filter_by(course_code=course_code)
    #     if updated_course is None:
    #         raise ErrorHandler({
    #             'description': 'Course does not exist.',
    #             'status_code': 404
    #         })
    #     updated_course = Course(**course)
    #     updated_course.update()
    #     return updated_course.serialize()

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

    # def get_all_courses(self):
    #     courses = Course.query.all()
    #     if courses is None:
    #         raise ErrorHandler({
    #             'description': 'Course does not exist.',
    #             'status_code': 404
    #         })
    #     data = [course.serialize() for course in courses]
    #     return data
