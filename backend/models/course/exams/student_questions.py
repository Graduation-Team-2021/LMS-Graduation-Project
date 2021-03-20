from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Student_Questions(db.Model, Base):
    __tablename__ = 'student_questions'
    student_id = db.Column(db.Integer, ForeignKey('student.user_id', ondelete='CASCADE', onupdate="CASCADE"))
    question_id = db.Column(db.Integer, ForeignKey('questions.question_id', ondelete='CASCADE', onupdate="CASCADE"))
    student_question_id = db.Column(db.Integer, primary_key=True)
    db.UniqueConstraint(student_id, question_id)

    def serialize(self):
        return {
            "question_id": self.question_id,
            "student_id": self.student_id,
            "student_question_id": self.student_question_id
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
