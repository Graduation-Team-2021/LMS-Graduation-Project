from flask_sqlalchemy import SQLAlchemy
from pydbgen import pydbgen
db = SQLAlchemy()
from backend.models.courses import Course
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
    # seed(db)


def db_drop_and_create_all():
    db.drop_all()
    db.create_all()

"""
seeding the database
"""
def seed(db):
    mydb = pydbgen.pydb()
    for i in range(10):
        course = Course(course_code=i,
                        course_name="course name",
                        weekly_hours=5,
                        group_number=i,
                        max_students=5)
        db.session.add(course)
        db.session.commit()
