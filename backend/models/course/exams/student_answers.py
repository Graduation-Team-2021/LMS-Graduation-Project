from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()



class Student_Answers(db.Model, Base):
    __tablename__ = 'student_answers'     
    student_answer_id = db.Column(db.Integer,primary_key=True)
    student_question_id = db.Column(db.Integer, ForeignKey('student_questions.student_question_id', ondelete='CASCADE', onupdate="CASCADE"))
    student_answer = db.Column(db.String(50), nullable=False)
    correct_answer = db.Column(db.Boolean)
    
    def serialize(self):
        return {
            "student_answer_id": self.student_answer_id,
            "student_question_id": self.student_question_id,
            "student_answer": self.student_answer
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
