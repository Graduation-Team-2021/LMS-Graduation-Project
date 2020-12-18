from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship,backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Teaches_Relation(db.Model,Base):
 __tablename__ = 'teaches'
 professor_id           =  db.Column(db.Integer,ForeignKey('professor.user_id', ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)
 course_id            =  db.Column(db.String(5),ForeignKey('course.course_code',ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)
 
 professor = relationship('Professor', backref=backref('right_association'), passive_deletes=True)
 course  = relationship('Course', backref=backref('left_association'), passive_deletes=True)
