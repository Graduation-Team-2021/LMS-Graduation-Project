from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Post(db.Model, Base):
    __tablename__ = 'post'
    post_id=db.Column(db.Integer,primary_key=True)
    post_writer = db.Column(db.Integer, ForeignKey('user.user_id', onupdate="CASCADE"))
    post_owner = db.Column(db.Integer, ForeignKey('post_owner.id', onupdate="CASCADE"))
    post_text=db.Column(db.Text(20000))

    def serialize(self):
        return {
            'post_writer': self.post_writer,
            'post_owner': self.post_owner,
            'post_text':self.post_text
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
