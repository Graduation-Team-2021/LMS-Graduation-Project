from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Materials(db.Model, Base):
    __tablename__ = 'material'
    material_id = db.Column(db.Integer, primary_key=True)
    material_name = db.Column(db.String(50), nullable=False)
    material_type = db.Column(db.String(50), nullable=False)
    downloadable = db.Column(db.Boolean, nullable=False)
    course_material = db.Column(db.String(5), ForeignKey('course.course_code', ondelete='CASCADE', onupdate="CASCADE"),
                                nullable=False)
    students_number = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "material_id": self.material_id,
            "material_name": self.material_name,
            "material_type": self.material_type,
            "downloadable": self.downloadable,
            "course_material": self.course_material
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
