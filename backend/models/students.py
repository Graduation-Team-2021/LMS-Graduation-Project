from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship,backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Student(db.Model,Base):
 __tablename__ = 'student'
 user_id        =  db.Column(db.Integer, ForeignKey('user.user_id', ondelete='CASCADE',onupdate="CASCADE"), nullable=False, primary_key=True)
 student_year   =  db.Column(db.Integer,nullable=False)
 email          =  db.Column(db.String(50),nullable=False)
 national_id    =  db.Column(db.Integer,nullable=False, unique=True)
 birthday       =  db.Column(db.Date,nullable=False)
 password       =  db.Column(db.String(255))
 
 '''
 Relations
 '''
 user                =  relationship("User", back_populates="student") 


def serialize(self):
        return {
            'id': self.user_id,
            'name': self.name
        }

def get(self,user_id):
     user = self.query.filter_by(user_id=user_id).one()
     return user.serialize()