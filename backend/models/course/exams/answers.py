from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()



class Answers(db.Model, Base):
    __tablename__ = 'answers'
    answer_id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(50), nullable=False)        
    question_id = db.Column(db.Integer, ForeignKey('questions.question_id', ondelete='CASCADE', onupdate="CASCADE"),
                            nullable=False)
    right_answer = db.Column(db.Boolean)

    def serialize(self):
        return {
            "answer_id": self.answer_id,
            "answer": self.answer,
            "question_id": self.question_id,
            "right_answer": self.right_answer
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