from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()


class Post_Commenter_relation(db.Model, Base):
    __tablename__ = 'post_commenter'
    commenter_id = db.Column(db.Integer, ForeignKey('user.user_id', onupdate="CASCADE"),
                             primary_key=True)
    post_id = db.Column(db.Integer, ForeignKey('post.post_id', ondelete='CASCADE', onupdate="CASCADE"),
                        primary_key=True)
    comment_text = db.Column(db.Text(20000))
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def serialize(self):
        return {
            'commenter_id': self.commenter_id,
            'post_id': self.post_id,
            'comment_text': self.comment_text
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
