from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()



class Questions(db.Model, Base):
    __tablename__ = 'questions'
    question_id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False, unique=True)   
    mark =    db.Column(db.Integer)          
    event_id = db.Column(db.Integer, ForeignKey('events.event_id', ondelete='CASCADE', onupdate="CASCADE"),
                            nullable=False)

    def serialize(self):
        return {
            "question_id": self.question_id,
            "question": self.question,
            "mark": self.mark
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
