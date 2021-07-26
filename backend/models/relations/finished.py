from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Finished(db.Model, Base):
    __tablename__ = 'finish'

    course_code = db.Column(db.String(10), ForeignKey('course.course_code', ondelete='CASCADE', onupdate="CASCADE"),
                            primary_key=True)
    student_id = db.Column(db.Integer, ForeignKey('student.user_id', ondelete='CASCADE', onupdate="CASCADE"),
                           primary_key=True)
    total_mark_in_the_course=db.Column(db.Float)

    def serialize(self):
        return {
            'course_code': self.course_code,
            'student_id': self.student_id,
            'total_mark_in_the_course':self.total_mark_in_the_course
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
