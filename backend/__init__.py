from flask import Flask
from .models.config import setup_db


"""
import all models from models
"""
from .models.users import User


"""
app and database initilization
"""
app = Flask(__name__)
setup_db(app)


"""
import all the endpoints from views
"""
from .views.users import Users







 




