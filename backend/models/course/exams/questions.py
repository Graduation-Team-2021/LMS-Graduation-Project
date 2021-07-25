from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Questions(db.Model, Base):
    __tablename__ = 'questions'
    question_id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500), nullable=False)
    mark = db.Column(db.Integer)
    exam_id = db.Column(db.Integer, ForeignKey('exams.exam_id', ondelete='CASCADE', onupdate="CASCADE"),
                        nullable=False)
    db.UniqueConstraint(question, exam_id)

    def serialize(self):
        return {
            "question_id": self.question_id,
            "question": self.question,
            "mark": self.mark,
            'exam_id':self.exam_id
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()
        return self.question_id

    def update(self):
        db.session.merge(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
