from models.course.post import Post
from methods.errors import *

class Post_Controller:
    def get_post_by_id(self,post_id):
        try:
            post=Post.query.filter_by(post_id=post_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if post is None:
            raise ErrorHandler({
                'description': 'Post does not exist.',
                'status_code': 404
            })
        return post.serialize()

    def delete_post_by_id(self,post_id):
        try:
            to_be_deleted=Post.query.filter_by(post_id=post_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if to_be_deleted is None:
            raise ErrorHandler({
                'description': 'Post does not exist.',
                'status_code': 404
            })
        Post.delete(to_be_deleted)
        return True
    
    def update_post(self, post_id,post):
        try:
            to_be_updated_post = Post.query.filter_by(post_id=post_id)
            if to_be_updated_post is None:
                raise ErrorHandler({
                    'description': 'Post does not exist.',
                    'status_code': 404
                })
            to_be_updated_post = Post(**post)
            to_be_updated_post.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            }) 
        return to_be_updated_post.serialize()

    def post_a_post(self, post):
        try:
            new_post = Post(**post)
            new_post = Post.insert(new_post)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_post

    def get_all_posts(self):
        try:
            posts = Post.query.all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if posts is None:
            raise ErrorHandler({
                'description': 'Posts do not exist.',
                'status_code': 404
            })
        data = [post.serialize() for post in posts]
        return data