from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Deliver(db.Model, Base):
    __tablename__ = 'deliver'

    deliverable_id = db.Column(db.Integer,
                               ForeignKey('deliverable.deliverable_id', ondelete='CASCADE', onupdate="CASCADE"),
                               primary_key=True)  # table name not class name
    group_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, ForeignKey('student.user_id', ondelete='CASCADE', onupdate="CASCADE"),
                           primary_key=True)  # table name not class name
    student = relationship("Student", foreign_keys=[student_id])  # class name not table name
    deliverable = relationship("Deliverables", foreign_keys=[deliverable_id])  # class name not table name

    def serialize(self):
        return {
            'deliverable_id ': self.deliverable_id,
            'group_id ': self.group_id,
            'student_id': self.student_id,
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
