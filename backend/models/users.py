from .config import db
from sqlalchemy import Column, String, Integer
    
class User(db.Model):
 __tablename__ = 'users'

 user_id = db.Column(db.Integer, primary_key=True)
 name = db.Column(db.Integer)