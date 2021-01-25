from models.course.exams.questions import Questions
from models.course.exams.answers   import Answers
from models.course.exams.exam      import Exams
from models.course.exams.student_answers import Student_Answers
from models.course.exams.student_questions import Student_Questions
from models.course.exams.results import Results
from models.user.students import Student
from controllers.course.exams.results import results_controller
from controllers.course.exams.questions import questions_controller
from controllers.course.exams.answers import answers_controller
from controllers.course.exams.student_questions import student_questions_controller
from controllers.course.exams.student_answers import student_answers_controller
from methods.errors import *

results_controller = results_controller()
questions_controller = questions_controller()
answers_controller = answers_controller()
student_questions_controller = student_questions_controller()
student_answers_controller = student_answers_controller()

class exams_controller():

    def post_exam(self, exam):
        try:    
            new_exam = Exams(**exam)
            new_exam = Exams.insert(new_exam)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_exam

    def get_exam(self, exam_id):
        try:
            exam = Exams.query.filter_by(exam_id=exam_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if exam is None:
            raise ErrorHandler({
                'description': 'Exam does not exist.',
                'status_code': 404
            })
        return exam.serialize()
    
    def update_exam(self, exam_id, exam):
        try:
            updated_exam = Exams.query.filter_by(exam_id=exam_id).first()
            if updated_exam is None:
                raise ErrorHandler({
                    'description': 'Exam does not exist.',
                    'status_code': 404
                })
            exam["event_id"] = updated_exam.event_id
            updated_exam = Exams(**exam)
            updated_exam.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            }) 
        return updated_exam.serialize()

    
    def submit_exam(self,questions,exam_id,student_id):
        try:
            students_mark = 0.0
            flag=1
            for question_id,answers in questions[0].items():
                wrong_answer_flag = 0
                student_question = {
                    'student_id':student_id,
                    'question_id':question_id
                }
                student_questions_controller.post_student_question(student_question)
                student_question_id = student_questions_controller.get_student_question(student_id,question_id).student_question_id
                correct_answers = answers_controller.get_all_correct_answers(int(question_id))
                question_mark = questions_controller.get_question(question_id).mark
                if len(correct_answers) != len(answers):
                    wrong_answer_flag=1
                    flag=0
                for answer in answers:
                    if not any(d['answer'] == answer for d in correct_answers):
                        wrong_answer_flag=1
                        flag=0
                    student_answer = {
                    'student_question_id':student_question_id,
                    'student_answer':answer,
                    'correct_answer':flag
                    }
                    flag=1
                    student_answers_controller.post_student_answer(student_answer)
                if wrong_answer_flag==0:
                    students_mark += question_mark
                
            results = {
                'student_id': student_id,
                'exam_id': exam_id,
                'mark': students_mark
            }   
            results_controller.post_results(results)
            return
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })  
    
    def student_exam_results(self,exam_id):
        try:
            student_id = 1
            my_results = Student_Answers.query.join(Student_Questions).filter(
                Student_Answers.student_question_id==Student_Questions.student_question_id).join(
                    Student).filter(Student.user_id==student_id).join(Questions).filter(
                        Student_Questions.question_id==Questions.question_id
                    ).filter(Questions.exam_id==exam_id).with_entities(
                        Questions.question,Student_Answers.student_answer,Questions.question_id,Questions.mark,Student_Answers.correct_answer).all()
            if not my_results:
                raise ErrorHandler({
                'description': 'Results do not exist.',
                'status_code': 404
            })
            formatted_results = []
            for result in my_results:
                question = result[0]
                my_answer = result[1]
                question_id = result[2]
                mark = result[3]
                right_answer = result[4]
                correct_answers = answers_controller.get_all_correct_answers(int(question_id))
                correct_answers_formatted = []
                for correct_answer in correct_answers:
                    correct_answers_formatted.append(correct_answer['answer'])
                index = next((index for (index, d) in enumerate(formatted_results) if d["question"] == result[0]), None)
                if index is None:
                    formatted_results.append({
                        'question' : question,
                        'my_answers' :[my_answer],
                        'correct_answers':correct_answers_formatted,
                        'question_id': question_id,
                        'mark': mark,
                        'correct_answer': right_answer
                    }
                    )
                else:
                    formatted_results[index]['my_answers'].append(my_answer)
            
            if not formatted_results:
                raise ErrorHandler({
                'description': 'Results do not exist.',
                'status_code': 404
            })


            return formatted_results
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            }) 