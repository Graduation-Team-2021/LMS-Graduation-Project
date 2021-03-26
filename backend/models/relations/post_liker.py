from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Post_liker_relation(db.Model, Base):
    __tablename__ = 'post_liker'
    liker_id = db.Column(db.Integer, ForeignKey('user.user_id', onupdate="CASCADE"),
                             primary_key=True)
    post_id = db.Column(db.Integer, ForeignKey('post.post_id', ondelete='CASCADE', onupdate="CASCADE"),
                            primary_key=True)


    def serialize(self):
        return {
            'liker_id': self.liker_id,
            'post_id': self.post_id,
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
