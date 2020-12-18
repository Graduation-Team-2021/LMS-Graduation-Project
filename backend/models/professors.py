from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Professor(db.Model,Base):
 __tablename__ = 'professor'
 user_id            =  db.Column(db.Integer, ForeignKey('user.user_id',ondelete='CASCADE',onupdate="CASCADE"), nullable=False, primary_key=True)
 scientific_degree  =  db.Column(db.String(50),nullable=False)
 
 '''
 Relations
 '''
 user       =  relationship("User", back_populates="professor") 

 def serialize(self):
        return {
            'id': self.user_id,
            'name': self.name
        }

 def get(self,user_id):
     user = self.query.filter_by(user_id=user_id).one()
     return user.serialize()