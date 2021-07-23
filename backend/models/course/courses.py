from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import json
from datetime import datetime

Base = declarative_base()


class Course(db.Model, Base):
    __tablename__ = 'course'
    course_code = db.Column(db.String(10), primary_key=True)
    course_name = db.Column(db.String(50), nullable=False)
    weekly_hours = db.Column(db.Integer, nullable=False)
    group_number = db.Column(db.Integer, nullable=False)
    max_students = db.Column(db.Integer, nullable=False)
    course_description = db.Column(db.Text(30000))
    post_owner_id=db.Column(db.Integer,ForeignKey('post_owner.owner_id', onupdate="CASCADE",ondelete='SET NULL'))
    course_deadline=db.Column(db.DateTime)
    course_pic = db.Column(db.Text(30000), nullable=True)
    final = db.Column(db.Integer, nullable=False, default=0)
    mid = db.Column(db.Integer, nullable=False, default=0)

    def serialize(self):
        return {
            'course_code': self.course_code,
            'course_name': self.course_name,
            'weekly_hours': self.weekly_hours,
            'group_number': self.group_number,
            'max_students': self.max_students,
            "course_description":self.course_description,
            "post_owner_id":self.post_owner_id,
            "course_deadline": json.dumps(
            self.course_deadline, default=str).replace("\"", ""),
            'course_pic': self.course_pic,
            'final': self.final,
            'mid': self.mid
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()
        return self.course_code

    def update(self):
        db.session.merge(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
