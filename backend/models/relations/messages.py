from models.config import db
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship,backref
from sqlalchemy.ext.declarative import declarative_base




class Messages(db.Model):
 __tablename__ = 'message'
 message_id           =  db.Column(db.Integer,primary_key=True)
 sender_id            =  db.Column(db.Integer,ForeignKey('user.user_id',ondelete='CASCADE',onupdate="CASCADE"))
 receiver_id          =  db.Column(db.Integer,ForeignKey('user.user_id',ondelete='CASCADE',onupdate="CASCADE"))
 text                 =  db.Column(db.Text)
 sent_time            =  db.Column(db.DateTime)
 sender   = relationship("User", foreign_keys=[sender_id]) 
 receiver = relationship("User", foreign_keys=[receiver_id])
 
 

 def serialize(self):
        return {
            'message_id ': self.message_id ,
            'sender_id ': self.sender_id ,
            'receiver_id': self.receiver_id,
            'text': self.text,
            'sent_time': self.sent_time
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
    

 
