from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class GroupDeliverableRelation(db.Model, Base):
    __tablename__ = 'group_deliverable_relation'
    group_id = db.Column(db.Integer, ForeignKey('group_project.group_id', ondelete='CASCADE', onupdate="CASCADE"),
                         primary_key=True)
    deliverable_id = db.Column(db.Integer,
                               ForeignKey('deliverable.deliverable_id', ondelete='CASCADE', onupdate="CASCADE"),
                               primary_key=True)

    group = relationship("GroupProject", foreign_keys=[group_id])
    deliverable = relationship("Deliverables", foreign_keys=[deliverable_id])

    def serialize(self):
        return {
            "group_id": self.group_id,
            "deliverable_id": self.deliverable_id
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
