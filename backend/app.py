from flask                  import Flask
from backend.models.config  import setup_db
from flask_restful          import Api




"""
import all models from models
"""
from backend.models.user.users                      import User
from backend.models.user.students                   import Student
from backend.models.user.professors                 import Professor
from backend.models.course.courses                  import Course
from backend.models.course.events                   import Events
from backend.models.course.deliverables             import Deliverables
from backend.models.course.materials                import Materials
from backend.models.relations.learns                import Learns_Relation
from backend.models.relations.teaches               import Teaches_Relation
from backend.models.relations.messages              import Messages
from backend.models.relations.has_prerequistes      import Prerequiste
from backend.models.relations.delivers              import Deliver
from backend.models.relations.finished              import Finished



"""
app and database initilization
"""
app = Flask(__name__)
setup_db(app)
api = Api(app)



"""
import all the endpoints from views
"""
from backend.views.user.users                       import User
from backend.views.course.courses                   import Course,Courses
from backend.views.relations.user_course_relation   import User_Course_Relation

api.add_resource(User, '/user')
api.add_resource(Course, '/courses/<course_code>')
api.add_resource(Courses, '/courses')
api.add_resource(User_Course_Relation, '/user/courses')












 




