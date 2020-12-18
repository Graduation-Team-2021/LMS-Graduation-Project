from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Events(db.Model,Base):
 __tablename__ = 'events'
 event_id            =  db.Column(db.Integer, primary_key=True)
 event_name          =  db.Column(db.String(50),nullable=False)
 event_date          =  db.Column(db.Date,nullable=False)
 course_code         =  db.Column(db.String(50), ForeignKey('course.course_code',ondelete='CASCADE',onupdate="CASCADE"), nullable=False)
 max_students        =  db.Column(db.Integer,nullable=False)


 '''
 Relations
 '''
 course      =  relationship("Course", back_populates="events") 

