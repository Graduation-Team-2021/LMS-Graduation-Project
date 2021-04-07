from controllers.course.post import Post_Controller
from methods.errors import *
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify, send_from_directory


controller_object=Post_Controller()

#posts/<post_id>
class Post_view(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('post_writer', type=str, location='json')
        self.reqparse.add_argument('post_owner', type=str, location='json')
        self.reqparse.add_argument('post_text', type=str, location='json')

    def get(self,post_id):
        try:
            post=controller_object.get_post_by_id(post_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'post': post,
            'status_code': 200
        }) 


    def put(self,post_id):
        args = self.reqparse.parse_args()
        new_post={
            "post_writer":args['post_writer'],
            "post_owner":args['post_owner'],
            "post_text":args['post_text']
        }
        try:
            post=controller_object.update_post(post_id,new_post)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'post': post,
            'message': 'post updated successfully',
            'status_code': 200
        })


    def delete(self,post_id):
        try:
            controller_object.delete_post_by_id(post_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Post deleted successfully',
            'status_code': 200
        })

#/posts/add_post
class Post_the_post(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('post_writer', type=str, location='json')
        self.reqparse.add_argument('post_owner', type=str, location='json')
        self.reqparse.add_argument('post_text', type=str, location='json')

    def post(self):
        args = self.reqparse.parse_args()
        new_post={
            "post_writer":args['post_writer'],
            "post_owner":args['post_owner'],
            "post_text":args['post_text']
        }
        try:
            controller_object.post_a_post(new_post)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'Post created successfully',
            'status_code': 200
        })

#/<student_id>/first_10_posts
class FirstTenPosts(Resource):
    def get(self):
        try:
            ten_posts = controller_object.get_one_student_first_ten_courses()
            return jsonify({
                'posts':ten_posts,
                'status_code':200
            })
        except ErrorHandler as e :
            return e.error
    

#student/<student_id>/my_posts
class MyPosts(Resource):
    def get(self,student_id):
        try:
            posts = controller_object.get_the_student_first_posts(student_id)
            return jsonify({
                'posts':posts,
                'status_code':200
            })
        except ErrorHandler as e :
            return e.error
    
#posts/<owner_id>
class GetPostByOwnerID(Resource):
    def get(self,owner_id):
        posts = controller_object.get_posts_by_owner_id(owner_id)
        return jsonify({
                'posts':posts,
                'status_code':200
            })