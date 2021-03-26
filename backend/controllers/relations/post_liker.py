from models.relations.post_liker import Post_liker_relation
from models.course.post import Post
from models.user.users import User

class Post_Liker_controller:
    def get_one_post_all_likers(self,post_id):
        try:
            # likes=Post_liker_relation.query.join(User).\
            # filter(User.user_id==user_id).\
            # with_entities(User.name,Post_liker_relation.post_id,Post_liker_relation.liker_id)
            likes=Post_liker_relation.query.filter(Post_liker_relation.post_id).join(User).filter(Post_liker_relation.liker_id==User.user_id).\
            with_entities(User.user_id,User.name)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data=[c for c in likes]
        return data
    
    