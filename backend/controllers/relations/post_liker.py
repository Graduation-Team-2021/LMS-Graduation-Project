from methods.errors import ErrorHandler
from models.relations.post_liker import Post_liker_relation
from models.course.post import Post
from models.user.users import User
from methods.errors import *

class Post_Liker_controller:
    def get_one_post_all_likers(self,post_id):
        try:
            # likes=Post_liker_relation.query.join(User).\
            # filter(User.user_id==user_id).\
            # with_entities(User.name,Post_liker_relation.post_id,Post_liker_relation.liker_id)
            likes=Post_liker_relation.query.filter(Post_liker_relation.post_id==post_id).join(User).\
            filter(Post_liker_relation.liker_id==User.user_id).\
            with_entities(User.user_id,User.name, Post_liker_relation.liker_id)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data=[c for c in likes]
        return data
    

    def get_one_liker_all_posts(self,liker_id):
        try:
            posts=Post_liker_relation.query.filter(Post_liker_relation.liker_id==liker_id).\
            join(User).filter(Post_liker_relation.liker_id==User.user_id).\
            with_entities(User.user_id,User.name,Post_liker_relation.post_id)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data=[c for c in posts]
        return data

    def insert_like(self,liker_id,post_id):
        like={'liker_id':liker_id, 'post_id':post_id}
        try:
            new_like=Post_liker_relation(**like)
            Post_liker_relation.insert(new_like)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_like

    def delete_like(self,liker_id,post_id):
        try:
            to_be_deleted=Post_liker_relation.query.filter_by(liker_id=liker_id,post_id=post_id).first()
            to_be_deleted.delete()
            if to_be_deleted is None:
                raise ErrorHandler({
                    'description': 'Like does not exist.',
                    'status_code': 404
                })
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return True

    