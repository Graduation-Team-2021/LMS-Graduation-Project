from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Teaches_Relation(db.Model,Base):
 __tablename__ = 'teaches'
 professor_id           =  db.Column(db.Integer,ForeignKey('professor.user_id', ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)
 course_code           =  db.Column(db.String(5),ForeignKey('course.course_code',ondelete='CASCADE',onupdate="CASCADE"),primary_key=True)
 
 def serialize(self):
        return {
            'professor_id': self.professor_id,
            'course_code': self.course_code
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

