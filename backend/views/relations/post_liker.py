from controllers.relations.post_liker import Post_Liker_controller
from methods.auth import *
from flask_restful import Resource, reqparse
from flask import current_app, jsonify

controller_object=Post_Liker_controller()

#/post/<post_id>/likers
class Post_liker_view(Resource):
    def get(self,post_id):
        likers= controller_object.get_one_post_all_likers(post_id)
        data_list=[]
        for i in range(len(likers)):
            data_list.append({
                'liker_id':likers[i][0],
                'liker_name':likers[i][1]
            })
        return data_list

#/liker/<liker_id>/posts
class Liker_all_posts(Resource):
    def get(self,liker_id):
        
        posts=controller_object.get_one_liker_all_posts(liker_id)
        data=[]
        for i in range(len(posts)):
            data.append({
                'liker_id':posts[i][0],
                'liker_name':posts[i][1],
                'post_id':posts[i][2]
            })
        return data