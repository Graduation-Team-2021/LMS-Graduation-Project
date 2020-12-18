from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship,backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Messages(db.Model,Base):
 __tablename__ = 'message'
 message_id           =  db.Column(db.Integer,ForeignKey('student.user_id', ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)
 sender_id            =  db.Column(db.String(5),ForeignKey('course.course_code',ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)
 
 student = relationship('Student', backref=backref('right_association'), passive_deletes=True)
 course  = relationship('Course', backref=backref('left_association'), passive_deletes=True)
