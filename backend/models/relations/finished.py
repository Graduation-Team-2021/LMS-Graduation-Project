from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Finished(db.Model, Base):
    __tablename__ = 'finish'

    course_code = db.Column(db.String(5), ForeignKey('course.course_code', ondelete='CASCADE', onupdate="CASCADE"),
                            primary_key=True)
    student_id = db.Column(db.Integer, ForeignKey('student.user_id', ondelete='CASCADE', onupdate="CASCADE"),
                           primary_key=True)
