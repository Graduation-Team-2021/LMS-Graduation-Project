from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Deliver(db.Model, Base):
    __tablename__ = 'deliver'
    delivers_id = db.Column(db.Integer,primary_key=True)
    deliverable_id = db.Column(db.Integer,ForeignKey('deliverable.deliverable_id', ondelete='CASCADE', onupdate="CASCADE"))  
    student_id = db.Column(db.Integer, ForeignKey('student.user_id', ondelete='CASCADE', onupdate="CASCADE"))  
    file_type = db.Column(db.String(6))
    file_name = db.Column(db.String(50))
    
    student = relationship("Student", foreign_keys=[student_id])  
    deliverable = relationship("Deliverables", foreign_keys=[deliverable_id]) 
    
    def serialize(self):
        return {
            'delivers_id': self.delivers_id,
            "file_type":self.file_type,
            "file_name":self.file_name
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
