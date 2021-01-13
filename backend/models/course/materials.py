from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Materials(db.Model,Base):
 __tablename__ = 'material'
 material_id                     =  db.Column(db.Integer, primary_key=True)
 material_name                   =  db.Column(db.String(50),nullable=False)
 material_type                   =  db.Column(db.String(50),nullable=False)
 downloadable                    =  db.Column(db.Boolean,nullable=False)
 file_path                       =  db.Column(db.String(80),nullable=False)
 course_material                 =  db.Column(db.String(5), ForeignKey('course.course_code',ondelete='CASCADE',onupdate="CASCADE"), nullable=False)
 students_number                 =  db.Column(db.Integer,nullable=False)



