from models.config import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Date, ForeignKey

Base = declarative_base()


class GroupProject(db.Model, Base):
    __tablename__ = 'group_project'
    group_id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(50))
    group_description = db.Column(db.Text(20000))
    post_owner_id=db.Column(db.Integer,ForeignKey('post_owner.owner_id', onupdate="CASCADE",ondelete='SET NULL'))

    def serialize(self):
        return {
            "group_id": self.group_id,
            "group_name": self.group_name,
            "group_description":self.group_description,
            "post_owner_id":self.post_owner_id
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
