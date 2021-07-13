from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Exams(db.Model, Base):
    __tablename__ = 'exams'
    exam_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.String(7), ForeignKey('course.course_code', ondelete='CASCADE', onupdate="CASCADE"),
                         nullable=False)
    exam_duration=db.Column(db.String(50))
    exam_marks = db.Column(db.Integer)

    def serialize(self):
        return {
            "exam_id":self.exam_id,
            "course_id": self.course_id,
            "exam_duration":self.exam_duration,
            'exam_marks':self.exam_marks
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()
        return self.exam_id

    def update(self):
        db.session.merge(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()