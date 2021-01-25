from flask import Flask
from models.config import app_setup
from flask_restful import Api

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
from views.course.materials import material, materials, download_material, upload_material
from views.relations.teaches import Professor_Course_Relation, UpdateAndDelete_professor_Courses_Relation
from views.relations.learns import Student_Course_Relation, Student_Courses_Relation
from views.relations.messages import Messages_Relation,DeleteMessageById
from views.relations.delivers import Delivers_Relation, Delete_Deliverable
from views.course.deliverables import upload_file, Deliverable_view, All_Deliverables,download_file
from views.course.events import Event, Events
from views.relations.finished import finished_relation_view,finished_relation_using_the_two_keys
from views.relations.has_prerequisites import prerequisite_view
from views.relations.has_prerequisites import retrieve_all_prequisites
from views.relations.has_prerequisites import postPrequisites

"""
Users
"""
api.add_resource(User, '/users/<user_id>')
api.add_resource(Users, '/users')
api.add_resource(Sign_Up, '/sign_up')
api.add_resource(Login, '/login')
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
api.add_resource(My_Courses, '/my_courses')
"""
Materials
"""
api.add_resource(material, '/courses/<course_code>/materials/<id>')
api.add_resource(materials, '/courses/<course_code>/materials')
api.add_resource(download_material, '/courses/<course_code>/materials/<id>/download')
api.add_resource(upload_material, '/courses/<course_code>/materials/<id>/upload')
"""
Each student deliverables
"""
api.add_resource(Delivers_Relation, '/student/<student_id>/deliverables')
"""
Delete deliverable 
"""
api.add_resource(Delete_Deliverable, '/deliverables/<deliverable_id>/students/<student_id>')

"""
Each course deliverables
"""
# api.add_resource(, '/course/<course_code>/deliverables')
"""
Upload file (deliverable)
"""
api.add_resource(upload_file, '/students/<student_id>/course/<course_code>/deliverables/upload/<deliverable_id>')
"""
Download file (deliverable)
"""
api.add_resource(download_file, '/students/<student_id>/course/<course_code>/deliverables/download/<deliverable_id>')
"""
get Deliverable
"""
api.add_resource(All_Deliverables, '/deliverables')
api.add_resource(Deliverable_view, '/deliverables/<deliverable_id>')
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

"""
Run app
"""
if __name__ == "__main__":
    app.config["DEBUG"] = True
    app.run()
