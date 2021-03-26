from models.course.post_owner import PostOwner
from methods.errors import *


class Post_owner_controller:
    def post_postOwner(self,owner):
        try:
            new_owner=PostOwner(**owner)
            new_owner=PostOwner.insert(new_owner)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_owner


    def delete_postowner(self,owner_id):
        try:
            to_be_deleted=PostOwner.query.filter_by(id=owner_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if to_be_deleted is None:
            raise ErrorHandler({
                'description': 'Post owner does not exist.',
                'status_code': 404
            })
        PostOwner.delete(to_be_deleted)
        return True
    
   