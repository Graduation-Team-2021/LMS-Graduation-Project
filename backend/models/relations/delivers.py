from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship,backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Deliver(db.Model,Base):
 __tablename__ = 'deliver'
            
 deliverable_id             =  db.Column(db.Integer,ForeignKey('deliverable.deliverable_id',ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)
 group_id                   =  db.Column(db.Integer,primary_key=True)
 student_id                 =  db.Column(db.Integer,ForeignKey('student.user_id',ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)