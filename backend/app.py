from flask import Flask
from backend.models.config import setup_db
from flask_restful import Api



"""
import all models from models
"""
from backend.models.users                           import User
from backend.models.students                        import Student
from backend.models.professors                      import Professor
from backend.models.courses                         import Course
from backend.models.events                          import Events
from backend.models.deliverables                    import Deliverables
from backend.models.materials                       import Materials
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
from backend.views.users import Users
from backend.views.courses import Course,Courses

api.add_resource(Users, '/users')
api.add_resource(Course, '/courses/<course_code>')
api.add_resource(Courses, '/courses')












 




