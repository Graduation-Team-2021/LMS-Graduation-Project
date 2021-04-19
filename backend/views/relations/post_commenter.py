from controllers.relations.post_commenter import Post_Commenter_controller
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object=Post_Commenter_controller()


#/users/<user_id>/all_comments
class Post_commenter_view(Resource):
    def get(self,user_id):
        try:
            comments=controller_object.get_one_user_all_comments(user_id)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data_list=[]
        for i in range(len(comments)):
            data_list.append({
                'commenter_name':comments[i][0],
                'post_id':comments[i][1],
                'comment_text':comments[i][2]
            })
        return data_list

#/comments/<commenter_id>/<post_id>
class CommentView_Update_Delete(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('commenter_id', type=int, location='json')
        self.reqparse.add_argument('post_id', type=int, location='json')
        self.reqparse.add_argument('comment_text', type=str, location='json')

    def post(self,commenter_id,post_id):
        args = self.reqparse.parse_args()
        print(args)
        new_comment={
            'commenter_id':commenter_id,
            'post_id':post_id,
            'comment_text':args['comment_text']
        }
        try:
            controller_object.insert_comment(new_comment)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Comment added successfully',
            'status_code': 200
        })

    def put(self,commenter_id,post_id):
        args = self.reqparse.parse_args()
        new_comment={
            'commenter_id':commenter_id,
            'post_id':post_id,
            'comment_text':args['comment_text']
        }
        try:
            controller_object.update_a_comment(commenter_id,post_id,new_comment)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Comment updated successfully',
            'status_code': 200
        })
    def delete(self,commenter_id,post_id):
        try:
            controller_object.delete_a_comment(commenter_id,post_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message':'comment deleted successfully',
            'status_code':200
        })

#comments/<comment_id>
class Get_comment_by_comment_id(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('commenter_id', type=int, location='json')
        self.reqparse.add_argument('post_id', type=int, location='json')
        self.reqparse.add_argument('comment_text', type=str, location='json')
        self.reqparse.add_argument('created_date', type=datetime, location='json')


    def get(self,comment_id):
        return controller_object.get_comment_by_id(comment_id)
    
    def put(self,comment_id):
        args = self.reqparse.parse_args()
        defult_comment=controller_object.get_comment_by_id(comment_id)
        new_comment={
            'comment_id':comment_id,
            'commenter_id':args['commenter_id'] or defult_comment['commenter_id'],
            'post_id':args['post_id'] or defult_comment['post_id'],
            'comment_text':args['comment_text'] or defult_comment['comment_text'],
            'created_date':args['created_date'] or defult_comment['created_date']
        }
        try:
            controller_object.update_a_comment(comment_id,new_comment)
        except ErrorHandler as e:
            return e.error
        return jsonify(
            {
                'message':'relation updated successfully',
                'status_code':200
            })