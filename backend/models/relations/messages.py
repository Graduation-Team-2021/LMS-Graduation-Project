from backend.models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship,backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Messages(db.Model,Base):
 __tablename__ = 'message'
 message_id           =  db.Column(db.Integer,primary_key=True)
 sender_id            =  db.Column(db.Integer,ForeignKey('user.user_id',ondelete='CASCADE',onupdate="CASCADE"))
 receiver_id          =  db.Column(db.Integer,ForeignKey('user.user_id',ondelete='CASCADE',onupdate="CASCADE"))
 sent_time            =  db.Column(db.DateTime)

 sender     = relationship('User', backref=backref('right_association'), passive_deletes=True)
 receiver   = relationship('User', backref=backref('left_association'), passive_deletes=True)
