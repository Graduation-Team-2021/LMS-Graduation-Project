from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Course(db.Model,Base):
 __tablename__ = 'course'
 course_code           =  db.Column(db.String(5), primary_key=True)
 course_name           =  db.Column(db.String(50),nullable=False)
 weekly_hours          =  db.Column(db.Integer,nullable=False)
 group_number          =  db.Column(db.Integer,nullable=False, unique=True)
 max_students          =  db.Column(db.Integer,nullable=False)


 '''
 Relations
 '''
 events            =  relationship("Events", back_populates="course", passive_deletes=True)
 deliverable       =  relationship("Deliverables", back_populates="course", passive_deletes=True)
 material          =  relationship("Materials", back_populates="course", passive_deletes=True)
 

 def serialize(self):
        return {
            'id': self.user_id,
            'name': self.name
        }

 def get(self,user_id):
     user = self.query.filter_by(user_id=user_id).one()
     return user.serialize()