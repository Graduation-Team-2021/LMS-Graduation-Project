from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class GroupCourseRelation(db.Model, Base):
    __tablename__ = 'group_course_relation'
    group_id = db.Column(db.Integer, ForeignKey('group_project.group_id', ondelete='CASCADE', onupdate="CASCADE"),
                         primary_key=True)
    course_id = db.Column(db.String(5),
                               ForeignKey('course.course_code', ondelete='CASCADE', onupdate="CASCADE"),
                               primary_key=True)

    group = relationship("GroupProject", foreign_keys=[group_id])
    course = relationship("Course", foreign_keys=[course_id])

    def serialize(self):
        return {
            "group_id": self.group_id,
            "course_id": self.course_id
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
