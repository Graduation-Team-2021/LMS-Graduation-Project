from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Deliverables(db.Model, Base):
    __tablename__ = 'deliverable'
    deliverable_id = db.Column(db.Integer, primary_key=True)
    deliverable_name = db.Column(db.String(50), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    course_deliverables = db.Column(db.String(5),
                                    ForeignKey('course.course_code', ondelete='CASCADE', onupdate="CASCADE"),
                                    nullable=False)
    students_number = db.Column(db.Integer, nullable=False)
