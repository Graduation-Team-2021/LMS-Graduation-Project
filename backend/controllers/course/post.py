from operator import pos
from models.course.post import Post
from models.relations.learns import Learns_Relation
from models.relations.student_group_relation import StudentGroupRelation
from models.user.users import User
from models.user.students import Student
from models.course.courses import Course
from models.course.group_project import GroupProject
from models.relations.student_group_relation import StudentGroupRelation
from models.course.post_owner import PostOwner
from models.user.users import User
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
            # new_post = Post.insert(new_post)
            new_post.insert()
        except SQLAlchemyError as e:
            print(e)
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

    def get_one_student_first_ten_courses(self,student_id):
        courses=Course.query.join(Learns_Relation).\
        filter(Course.course_code==Learns_Relation.course_code).join(Student).\
        filter(Learns_Relation.student_id==Student.user_id==student_id).\
        with_entities(Course.course_code)
        
        groups=GroupProject.query.join(StudentGroupRelation).\
        filter(GroupProject.group_id==StudentGroupRelation.group_id).\
        join(Student).filter(Student.user_id==StudentGroupRelation.student_id).\
            with_entities(GroupProject.group_id)

        group_ids=[g for g in groups]
        course_codes=[c for c in courses]

        desired_courses=[]
        desired_groups=[]
        for i in range(len(course_codes)):
            # course=Course.query.filter_by(Course.course_code==i).first()
            course=Course.query.filter(Course.course_code==course_codes[i][0]).first().serialize()
            desired_courses.append(course)

        for i in range(len(group_ids)):
            group=GroupProject.query.filter(GroupProject.group_id==group_ids[i][0]).first().serialize()
            desired_groups.append(group)

        courses_post_owner_ids=[]
        for i in range(len(desired_courses)):
            courses_post_owner_ids.append((desired_courses[i]["post_owner_id"],desired_courses[i]["course_name"]))

        for i in range(len(desired_groups)):
            courses_post_owner_ids.append((desired_groups[i]["post_owner_id"], desired_groups[i]["group_name"]))

        
        # for i in range(len(courses_post_owner_ids)):
        #     desired_post_owner_ids=PostOwner.query.filter(PostOwner.id==courses_post_owner_ids[i][0]).all()
        
        # desired_posts=[]
        # for i in range(len(courses_post_owner_ids)):
        #     posts=Post.query.filter(Post.post_owner==courses_post_owner_ids[i]).all()
        #     desired_posts.append(p.serialize() for p in posts)

        desired_posts=[]
        for i in range(len(courses_post_owner_ids)):
            if Post.query.filter(Post.post_owner==courses_post_owner_ids[i][0]).first() is not None:
                posts=Post.query.filter(Post.post_owner==courses_post_owner_ids[i][0]).first().serialize()
                posts['owner_name']=courses_post_owner_ids[i][1]
                desired_posts.append(posts)

        post_writers_ids=[]
        for i in desired_posts:
            post_writers_ids.append(i["post_writer"])

        post_writers=[]
        for i in range(len(post_writers_ids)):
            users=User.query.filter(User.user_id==post_writers_ids[i]).first().serialize()
            post_writers.append(users['name'])
        

        for i in range(len(desired_posts)):
            desired_posts[i]['name']=post_writers[i]
        return desired_posts

    def get_the_student_first_posts(self,student_id):
        courses=Course.query.join(Learns_Relation).\
        filter(Course.course_code==Learns_Relation.course_code).join(Student).\
        filter(Learns_Relation.student_id==Student.user_id==student_id).\
        with_entities(Course.course_code)
        
        groups=GroupProject.query.join(StudentGroupRelation).\
        filter(GroupProject.group_id==StudentGroupRelation.group_id).\
        join(Student).filter(Student.user_id==StudentGroupRelation.student_id).\
            with_entities(GroupProject.group_id)

        group_ids=[g for g in groups]
        course_codes=[c for c in courses]

        desired_courses=[]
        desired_groups=[]
        for i in range(len(course_codes)):
            # course=Course.query.filter_by(Course.course_code==i).first()
            course=Course.query.filter(Course.course_code==course_codes[i][0]).first().serialize()
            desired_courses.append(course)

        for i in range(len(group_ids)):
            group=GroupProject.query.filter(GroupProject.group_id==group_ids[i][0]).first().serialize()
            desired_groups.append(group)
        courses_post_owner_ids=[]
        for i in range(len(desired_courses)):
            courses_post_owner_ids.append((desired_courses[i]["post_owner_id"]))

        for i in range(len(desired_groups)):
            courses_post_owner_ids.append((desired_groups[i]["post_owner_id"]))

        desired_posts=[]
        for i in range(len(courses_post_owner_ids)):
            if Post.query.filter(Post.post_owner==courses_post_owner_ids[i],Post.post_writer==student_id).first() is not None:
                posts=Post.query.filter(Post.post_owner==courses_post_owner_ids[i],Post.post_writer==student_id).first().serialize()
                desired_posts.append(posts)

        # return desired_posts
        return desired_posts


    def get_posts_by_owner_id(self,owner_id):
        posts=Post.query.filter(Post.post_owner==owner_id).all()
        data=[p.serialize() for p in posts]
        post_writer_ids=[]
        for i in data:
            post_writer_ids.append(i['post_writer'])
        post_writers=[]
        for i in range(len(post_writer_ids)):
            users=User.query.filter(User.user_id==post_writer_ids[i]).with_entities(User.name).all()
            post_writers.append(users)
        print(post_writers)
        for i in range(len(data)):
            data[i]['name']=post_writers[i][0][0]
        return data        