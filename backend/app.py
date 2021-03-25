from flask import Flask
from models.config import app_setup
from flask_restful import Api
from flask_mail import Mail, Message
import smtplib
import os

"""
import all models from models, models must be imported so that they are created on running the app.py
"""
from models.user.users import User
from models.user.students import Student
from models.user.professors import Professor
from models.course.courses import Course
from models.course.events import Events
from models.course.deliverables import Deliverables
from models.course.deliverables_results import Deliverables_Results
from models.course.materials import Materials
from models.relations.learns import Learns_Relation
from models.relations.teaches import Teaches_Relation
from models.relations.messages import Messages
from models.relations.has_prerequistes import Prerequiste
from models.relations.delivers import Deliver
from models.relations.finished import Finished
from models.relations.group_deliverable_relation import GroupDeliverableRelation
from models.relations.student_group_relation import StudentGroupRelation
from models.course.exams.exam import Exams
from models.course.exams.questions import Questions
from models.course.exams.answers import Answers
from models.course.exams.results import Results
from models.course.exams.student_answers import Student_Answers
from models.course.exams.student_questions import Student_Questions
from models.course.group_project import GroupProject

"""
app and database initilization
"""
app = Flask(__name__)
app_setup(app)
api = Api(app)
app.app_context().push()

"""
mail service
"""


# def send_email():
#     mail = Mail(app)
#     msg = Message('Hello,our lms mail service is working!', sender='ziadtht@gmail.com',
#                   recipients=['ziadtht@yahoo.com'])
#     mail.send(msg)
# send_email()


"""
import all the endpoints from views
"""
from views.user.users import User, Sign_Up, Users, Login,Reset_password,Profile
from views.user.professors import Professor, Professors
from views.user.students import Students, Student,Student_result_calculation
from views.course.courses import Course, Courses, My_Courses
from views.course.materials import material, materials, download_material, upload_material
from views.relations.teaches import Professor_Course_Relation, UpdateAndDelete_professor_Courses_Relation
from views.relations.learns import Student_Course_Relation, Student_Courses_Relation
from views.relations.messages import Messages_Relation, DeleteMessageById
from views.relations.delivers import Delivers_Relation, Delete_Delivers_Relation, Upload_Deliverable_File, Download_Deliverable_File, Student_Deliverables
from views.course.deliverables_results import Deliverable_Results

from views.course.deliverables import Deliverable_view, All_Deliverables,Students_Deliverables
from views.course.events import Event, Events
from views.course.exams.questions import Question, Questions
from views.course.exams.answers import Answers, Answer,Get_All_Right_Answers,Get_All_Wrong_Answers
from views.course.exams.exam import Exams, Exam, Submit_Exam, Student_Exam_Results
from views.course.exams.results import Results
from views.course.exams.student_questions import Student_Questions
from views.relations.finished import finished_relation_view, finished_relation_using_the_two_keys
from views.relations.has_prerequisites import prerequisite_view
from views.relations.has_prerequisites import retrieve_all_prequisites
from views.relations.has_prerequisites import postPrequisites
from views.course.group_project import GroupProject,InsertGroup
from views.relations.student_group_relation import StudentGroupView,EachGroupStudents

# Answers
"""
Users
"""
api.add_resource(User, '/users/<user_id>')
api.add_resource(Users, '/users')
api.add_resource(Sign_Up, '/sign_up')
api.add_resource(Login, '/login')
api.add_resource(Reset_password, '/reset/password')
api.add_resource(Profile, '/users/<user_id>/profile')
"""
Professor
"""
api.add_resource(Professor, '/professors/<user_id>')
api.add_resource(Professors, '/professors')
"""
Student
"""
api.add_resource(Students, '/students')
api.add_resource(Student, '/students/<user_id>')
api.add_resource(Student_result_calculation, '/students/<student_id>/results/<course_code>')
api.add_resource(StudentGroupView,'/student/<student_id>/groups')
api.add_resource(EachGroupStudents,'/group/<group_id>/students')

"""
Professor relation
"""
# feh moshkela hena
api.add_resource(Professor_Course_Relation, '/professor/<professor_id>/courses')
api.add_resource(UpdateAndDelete_professor_Courses_Relation, '/professor/<professor_id>/courses/<course_code>')
"""
Student relation
"""
api.add_resource(Student_Course_Relation, '/student/<student_id>/courses')
api.add_resource(Student_Courses_Relation, '/student/<student_id>/courses/<course_code>')
"""
Messages
"""
api.add_resource(Messages_Relation, '/users/messages/<conversee_id>')
api.add_resource(DeleteMessageById, '/users/messages/delete/<message_id>')


"""
Courses
"""
api.add_resource(Course, '/courses/<course_code>')
api.add_resource(Courses, '/courses')
api.add_resource(My_Courses, '/my_courses/<user_id>/<role>')
"""
Materials
"""
api.add_resource(material, '/courses/<course_code>/materials/<id>')
api.add_resource(materials, '/courses/<course_code>/materials')
api.add_resource(download_material, '/courses/<course_code>/materials/<id>/download')
api.add_resource(upload_material, '/courses/<course_code>/materials/<id>/upload')

"""
Exams
"""
api.add_resource(Questions, '/exams/<exam_id>/questions')
api.add_resource(Question, '/questions/<question_id>')
api.add_resource(Answers, '/questions/<question_id>/answers')
api.add_resource(Answer, '/answers/<answer_id>')
api.add_resource(Exams, '/events/<event_id>/exams')
api.add_resource(Exam, '/exams/<exam_id>')
api.add_resource(Submit_Exam,'/exams/<exam_id>/submit_exam')
api.add_resource(Student_Questions, '/student/<student_id>/question')
api.add_resource(Results,'/students/<student_id>/exams/<exam_id>/results')
api.add_resource(Student_Exam_Results,'/exams/<exam_id>/my_results')

"""
Each student deliverables
"""
api.add_resource(Delivers_Relation, '/my_deliverables')
api.add_resource(Deliverable_Results,'/students/<student_id>/deliverable/<deliverable_id>/results')
api.add_resource(Students_Deliverables,'/students_deliverables/<deliverable_id>')



"""
Delete deliverable
"""
api.add_resource(Delete_Delivers_Relation, '/my_deliverables/<delivers_id>')

# api.add_resource(, '/course/<course_code>/deliverables')

api.add_resource(Upload_Deliverable_File, '/my_deliverables/<delivers_id>/upload')

api.add_resource(Download_Deliverable_File, '/my_deliverables/<delivers_id>/download')
"""
get Deliverable
"""
api.add_resource(All_Deliverables, '/deliverables')
api.add_resource(Deliverable_view, '/deliverables/<deliverable_id>')
api.add_resource(Student_Deliverables, '/students/<student_id>/deliverables/<deliverable_id>')

"""
Events
"""
api.add_resource(Event, '/courses/<course_code>/events/<event_id>')
api.add_resource(Events, '/courses/<course_code>/events')

"""
Finished courses relation
"""
api.add_resource(finished_relation_view, '/student/<student_id>/finishedCourses')

"""
(Put) method in finished relation
"""
# feh moshkela hena en el course el gedeed bytdaf msh by3ml replace lel adeem
api.add_resource(finished_relation_using_the_two_keys, '/student/<student_id>/finishedCourses/<course_code>')
# api.add_resource(update_finished_course, '/student/<student_id>/updateFinishedCourses/<course_code>')

"""
Course prerequisite routes
"""
api.add_resource(prerequisite_view, '/courses/<course_id>/prerequisites')
"""
Get all prequisites
"""
api.add_resource(retrieve_all_prequisites, '/prerequisites')
"""
post or update prequisite
"""
api.add_resource(postPrequisites, '/prerequisites')

'''
Group_projects
'''
api.add_resource(GroupProject, '/project-groups/<group_id>')
api.add_resource(InsertGroup,'/project-groups')

"""
Run app
"""
if __name__ == "__main__":
    app.config["DEBUG"] = True
    app.run()
