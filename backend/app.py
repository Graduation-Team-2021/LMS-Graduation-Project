from flask import Flask
from models.config import app_setup
from flask_restful import Api
from methods.errors import ErrorHandler
import logging

"""
import all models from models
"""
from models.user.users import User
from models.user.students import Student
from models.user.professors import Professor
from models.course.courses import Course
from models.course.events import Events
from models.course.deliverables import Deliverables
from models.course.materials import Materials
from models.relations.learns import Learns_Relation
from models.relations.teaches import Teaches_Relation
from models.relations.messages import Messages
from models.relations.has_prerequistes import Prerequiste
from models.relations.delivers import Deliver
from models.relations.finished import Finished

"""
app and database initilization
"""
app = Flask(__name__)
app_setup(app)
api = Api(app)

"""
import all the endpoints from views
"""
from views.user.users import User, Sign_Up, Users, Login
from views.user.professors import Professor, Professors
from views.user.students import Students, Student
from views.course.courses import Course, Courses, My_Courses
from views.course.events import Event, Events;
from views.course.materials import material, materials, download_material, upload_material
from views.relations.professor_course_relation import Professor_Course_Relation, Professor_Courses_Relation
from views.relations.student_course_relation import Student_Course_Relation, Student_Courses_Relation
from views.relations.messages import Messages_Relation

"""
 Users
"""
api.add_resource(User, '/users/<user_id>')
api.add_resource(Users, '/users')
api.add_resource(Sign_Up, '/sign_up')
api.add_resource(Login,'/login')
# Professor
api.add_resource(Professor, '/professor/<user_id>')
api.add_resource(Professors, '/professors')
# Professor relation
api.add_resource(Professor_Course_Relation, '/professor/<professor_id>/courses')
api.add_resource(Professor_Courses_Relation, '/professor/<professor_id>/courses/<course_code>')
#Student
api.add_resource(Students, '/students')
api.add_resource(Student, '/student/<user_id>')
# Student relation
api.add_resource(Student_Course_Relation, '/student/<student_id>/courses')
api.add_resource(Student_Courses_Relation, '/student/<student_id>/courses/<course_code>')
# Messages
api.add_resource(Messages_Relation, '/users/messages/<conversee_id>')

"""
Courses
"""
api.add_resource(Course, '/courses/<course_code>')
api.add_resource(Courses, '/courses')
api.add_resource(My_Courses, '/my_courses')
# Materials
api.add_resource(material, '/courses/<course_code>/materials/<id>')
api.add_resource(materials, '/courses/<course_code>/materials')
api.add_resource(download_material, '/courses/<course_code>/materials/<id>/download')
api.add_resource(upload_material, '/courses/<course_code>/materials/<id>/upload')
# Events
api.add_resource(Event, '/courses/<course_code>/events/<id>')
api.add_resource(Events, '/courses/<course_code>/events')