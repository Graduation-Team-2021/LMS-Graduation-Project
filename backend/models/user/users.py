from models.config import db
from sqlalchemy import Column, String, Integer, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base





class User(db.Model):
 __tablename__ = 'user'
 user_id        =  db.Column(db.Integer, primary_key=True)
 name           =  db.Column(db.String(50),nullable=False)
 email          =  db.Column(db.String(50),nullable=False)
 national_id    =  db.Column(db.Integer,nullable=False, unique=True)
 birthday       =  db.Column(db.Date,nullable=False)
 password       =  db.Column(db.String(255))
 
 def serialize(self):
        return {
            'id': self.user_id,
            'name': self.name
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
