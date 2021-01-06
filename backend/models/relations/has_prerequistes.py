from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship,backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Prerequiste(db.Model,Base):
 __tablename__ = 'Prerequiste'
            
 course_id              =  db.Column(db.String(5),ForeignKey('course.course_code',ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)
 pre_course_id          =  db.Column(db.String(5),ForeignKey('course.course_code',ondelete='CASCADE',onupdate="CASCADE"))

 