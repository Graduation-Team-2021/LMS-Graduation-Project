from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Events(db.Model, Base):
    __tablename__ = 'events'
    event_id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(50), nullable=False)
    event_date = db.Column(db.Date, nullable=False)
    course_code = db.Column(db.String(50), ForeignKey('course.course_code', ondelete='CASCADE', onupdate="CASCADE"),
                            nullable=False)
    max_students = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "event_id": self.event_id,
            "event_name": self.event_name,
            "event_date": self.event_date,
            "course_code": self.course_code,
            "max_students": self.max_students
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



