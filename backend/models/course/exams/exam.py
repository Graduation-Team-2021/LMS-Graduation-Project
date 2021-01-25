from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()



class Exams(db.Model, Base):
    __tablename__ = 'exams'
    exam_id = db.Column(db.Integer, primary_key=True)
    actual_mark = db.Column(db.Float)          
    event_id = db.Column(db.Integer, ForeignKey('events.event_id', ondelete='CASCADE', onupdate="CASCADE"),
                            nullable=False,unique=True)

    def serialize(self):
        return {
            "actual_mark": self.actual_mark,
            "event_id": self.event_id
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
