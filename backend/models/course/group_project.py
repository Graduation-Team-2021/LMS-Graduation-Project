from models.config import db
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class GroupProject(db.Model, Base):
    __tablename__ = 'group_project'
    group_id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(50))

    def serialize(self):
        return {
            "group_id": self.group_id,
            "group_name": self.group_name
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
