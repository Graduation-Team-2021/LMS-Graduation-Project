from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from pydbgen import pydbgen
import os
from flask_mail import Mail,Message

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''


def app_setup(app):
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_PATH')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['STATIC_PATH'] = os.getenv('STATIC_PATH')
    app.config['ALLOWED_EXTENSIONS'] = ['jpg', 'jpeg', 'png']
    app.config['DEBUG'] = True
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
