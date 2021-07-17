from models.relations.post_commenter import Post_Commenter_relation
from models.course.post import Post
from models.user.users import User
from methods.errors import *


class Post_Commenter_controller:
    def get_one_user_all_comments(self,user_id):
        # comments=Post_Commenter_relation.query.join(User).\
        # filter(Post_Commenter_relation.commenter_id==user_id).\
        # join(Post).filter(Post_Commenter_relation.post_id==Post.post_id).\
        # with_entities(User.name,Post_Commenter_relation.comment_text,Post.post_id)
        # data=[]
        # for c in comments:
        #     data.append(c)
        # return data
        # comments=Post_Commenter_relation.query.filter_by(commenter_id=user_id).all()
        try:
            comments=Post_Commenter_relation.query.join(User).\
            filter(User.user_id==user_id).\
            with_entities(User.name,Post_Commenter_relation.post_id,Post_Commenter_relation.comment_text)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data=[c for c in comments]
        return data
    
    def delete_a_comment(self,commenter_id,post_id):
        try:
            to_be_deleted=Post_Commenter_relation.query.filter_by(commenter_id=commenter_id,post_id=post_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if not to_be_deleted:
             raise ErrorHandler({
                    'description': 'Course does not exist.',
                    'status_code': 404
                })
        Post_Commenter_relation.delete(to_be_deleted)
        return True
    def insert_comment(self,comment):
        try:
            new_comment=Post_Commenter_relation(**comment)
            Post_Commenter_relation.insert(new_comment)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_comment
    def update_a_comment(self,commenter_id,post_id,comment):
        try:
            to_be_udpated=Post_Commenter_relation.query.filter_by(commenter_id=commenter_id,post_id=post_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if not to_be_udpated:
             raise ErrorHandler({
                    'description': 'comment does not exist.',
                    'status_code': 404
                })
        to_be_udpated=Post_Commenter_relation(**comment)
        to_be_udpated.update()
        return to_be_udpated.serialize()

    def get_one_post_all_comments(self,post_id):
        try:
            comments=Post_Commenter_relation.query.filter(Post_Commenter_relation.post_id==post_id).join(User).\
            filter(Post_Commenter_relation.commenter_id==User.user_id).\
            with_entities(User.user_id,User.name,Post_Commenter_relation.comment_text, Post_Commenter_relation.comment_id)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data=[c for c in comments]
        return data

