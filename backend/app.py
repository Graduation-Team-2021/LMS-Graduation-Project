from flask                  import Flask
from models.config  import app_setup
from flask_restful          import Api



"""
import all models from models
"""
from models.user.users                      import User
from models.user.students                   import Student
from models.user.professors                 import Professor
from models.course.courses                  import Course
from models.course.events                   import Events
from models.course.deliverables             import Deliverables
from models.course.materials                import Materials
from models.relations.learns                import Learns_Relation
from models.relations.teaches               import Teaches_Relation
from models.relations.messages              import Messages
from models.relations.has_prerequistes      import Prerequiste
from models.relations.delivers              import Deliver
from models.relations.finished              import Finished



"""
app and database initilization
"""
app = Flask(__name__)
app_setup(app)
api = Api(app)



"""
import all the endpoints from views
"""
from views.user.users                       import User,Sign_Up
from views.course.courses                   import Course,Courses
from views.relations.user_course_relation   import User_Course_Relation

api.add_resource(User, '/users/<user_id>')
api.add_resource(Sign_Up, '/sign_up')
api.add_resource(Course, '/courses/<course_code>')
api.add_resource(Courses, '/courses')
api.add_resource(User_Course_Relation, '/user/courses')













 




