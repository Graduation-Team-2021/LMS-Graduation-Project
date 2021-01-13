from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import json
Base = declarative_base()


class Course(db.Model,Base):
 __tablename__ = 'course'
 course_code           =  db.Column(db.String(5), primary_key=True)
 course_name           =  db.Column(db.String(50),nullable=False)
 weekly_hours          =  db.Column(db.Integer,nullable=False)
 group_number          =  db.Column(db.Integer,nullable=False, unique=True)
 max_students          =  db.Column(db.Integer,nullable=False)

 def serialize(self):
        return {
            'course_code': self.course_code,
            'course_name': self.course_name,
            'weekly_hours': self.weekly_hours,
            'group_number': self.group_number,
            'max_students': self.max_students
        }
 
 def insert(self):
    db.session.add(self)
    db.session.commit()
  
 def update(self):
    db.session.merge(self)
    db.session.commit()
    

 def delete(self):
    db.session.delete(self)
    db.session.commit()

 