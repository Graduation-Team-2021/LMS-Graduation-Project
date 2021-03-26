from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class PostOwner(db.Model, Base):
    __tablename__ = 'post_owner'
    id = db.Column(db.Integer,primary_key=True)


    def serialize(self):
        return {
            'id': self.id,
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
