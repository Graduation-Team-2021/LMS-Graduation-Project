from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Professor(db.Model, Base):
    __tablename__ = 'professor'
    user_id = db.Column(db.Integer, ForeignKey('user.user_id', ondelete='CASCADE', onupdate="CASCADE"), nullable=False,
                        primary_key=True)
    scientific_degree = db.Column(db.String(50), nullable=False)

    def serialize(self):
        return {
            'id': self.user_id,
            'degree': self.scientific_degree,
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
