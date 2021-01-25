from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from flask import json

Base = declarative_base()


class Deliverables(db.Model, Base):
    __tablename__ = 'deliverable'
    deliverable_id = db.Column(db.Integer, primary_key=True)
    deliverable_name = db.Column(db.String(50), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    course_deliverables = db.Column(db.String(5),
                                    ForeignKey('course.course_code', ondelete='CASCADE', onupdate="CASCADE"),
                                    nullable=False)
    students_number = db.Column(db.Integer, nullable=False)
    deliverable_type= db.Column(db.String(50),nullable=False)

    def serialize(self):
        return {
            'deliverable_id': self.deliverable_id,
            'deliverable_name': self.deliverable_name,
            'deadline': self.deadline,
            "course_deliverables": self.course_deliverables, # this is the course code foreign key that references course table
            "students_number": self.students_number
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