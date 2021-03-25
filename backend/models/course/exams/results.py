from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Results(db.Model, Base):
    __tablename__ = 'results'
    student_id = db.Column(db.Integer, ForeignKey('student.user_id', ondelete='CASCADE', onupdate="CASCADE"),
                           primary_key=True)
    exam_id = db.Column(db.Integer, ForeignKey('exams.exam_id', ondelete='CASCADE', onupdate="CASCADE"),
                        primary_key=True)
    mark = db.Column(db.Float, nullable=False)
    out_of_mark=db.Column(db.Float, nullable=False)

    def serialize(self):
        return {
            "student_id": self.student_id,
            "exam_id": self.exam_id,
            "mark": self.mark,
            "out_of_mark":self.out_of_mark
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
