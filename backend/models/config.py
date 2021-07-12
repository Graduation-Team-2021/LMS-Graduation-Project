from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from pydbgen import pydbgen
import os
from flask_mail import Mail,Message
from flask_cors import CORS


db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''


def app_setup(app):
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:19702099@localhost:3306/lms"
    app.config['SECRET_KEY'] = "ANy HABDDDDDDDDD"
    app.config['STATIC_PATH'] = "/home/LMSUser/LMS-Graduation-Project/backend/static"
    app.config['ALLOWED_EXTENSIONS'] = ['jpg', 'jpeg', 'png']
    app.config['DEBUG'] = True
    app.config['CORS_HEADERS'] = 'Content-Type'

    #This allows front end to link with back end
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        return response
    ######
    
    #mail service
    # app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    # app.config['MAIL_PORT'] = 465
    # app.config['MAIL_USE_TLS'] = False
    # app.config['MAIL_USE_SSL'] = True
    # app.config['MAIL_USERNAME'] = os.getenv('EMAIL')
    # app.config['MAIL_PASSWORD'] = os.getenv('PASSWORD')
    # ##
    db.app = app
    db.init_app(app)
    db.create_all()
    # seed(db)


def db_drop_and_create_all():
    db.drop_all()
    db.create_all()
