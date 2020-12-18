from flask import Flask
from backend.models.config import setup_db
from flask_restful import Api


"""
import all models from models
"""
from backend.models.users import User


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

api.add_resource(Users, '/users')









 




