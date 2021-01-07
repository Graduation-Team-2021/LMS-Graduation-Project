from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from pydbgen import pydbgen

db = SQLAlchemy()


'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app):
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:password@localhost/lms"
    db.app = app
    db.init_app(app)
    db.create_all()
    migrate = Migrate(app, db)
    # seed(db)


def db_drop_and_create_all():
    db.drop_all()
    db.create_all()

