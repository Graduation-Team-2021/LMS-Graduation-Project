from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base


class Conversation(db.Model):
    __tablename__ = 'conversations'
    conversation_id = db.Column(db.Integer, primary_key=True)
    first_user = db.Column(db.Integer, ForeignKey('user.user_id', ondelete='CASCADE', onupdate="CASCADE"))
    second_user = db.Column(db.Integer, ForeignKey('user.user_id', ondelete='CASCADE', onupdate="CASCADE"))

    def serialize(self):
        return {
            'conversation_id': self.conversation_id,
            'first_user': self.first_user,
            'second_user': self.second_user
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
