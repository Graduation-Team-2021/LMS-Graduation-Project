from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from flask import json

Base = declarative_base()


class Deliverables_Results(db.Model, Base):
    __tablename__ = 'deliverables_results'
    deliverable_id = db.Column(db.Integer,ForeignKey('deliverable.deliverable_id', ondelete='CASCADE', onupdate="CASCADE"), primary_key=True)
    user_id = db.Column(db.Integer,ForeignKey('student.user_id', ondelete='CASCADE', onupdate="CASCADE"), primary_key=True)
    mark = db.Column(db.Integer)

    def serialize(self):
        return {
            'deliverable_id': self.deliverable_id,
            'user_id': self.user_id,
            'mark': self.mark
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