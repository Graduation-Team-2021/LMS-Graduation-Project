from backend.models.config import db
from sqlalchemy import Column, String, Integer

class User(db.Model):
 __tablename__ = 'users'
 user_id = db.Column(db.Integer, primary_key=True)
 name = db.Column(db.Integer)

 def serialize(self):
        return {
            'id': self.user_id,
            'name': self.name
        }

 def get(self,user_id):
     user = self.query.filter_by(user_id=user_id).one()
     return user.serialize()