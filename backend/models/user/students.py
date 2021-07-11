from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Student(db.Model, Base):
    __tablename__ = 'student'
    user_id = db.Column(db.Integer, ForeignKey('user.user_id', ondelete='CASCADE', onupdate="CASCADE"), nullable=False,
                        primary_key=True)
    student_year = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            'id': self.user_id,
            'student_year': self.student_year,
            #'group_project':self.group_project_id
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
