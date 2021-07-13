from models.course.courses import Course
from models.user.professors import Professor
from models.relations.teaches import Teaches_Relation
from controllers.course.post_owner import Post_owner_controller
from models.user.users import User
from methods.errors import *

post_owner_controller = Post_owner_controller()
class courses_controller():

    def get_course(self, course_code):
        try:
            course = Course.query.filter_by(course_code=course_code).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        if course is None:
            raise ErrorHandler({
                'description': 'Course does not exist.',
                'status_code': 404
            })
        return course.serialize()

    def delete_course(self, course_code):
        try:
            deleted_course = Course.query.filter_by(course_code=course_code).first()
            if deleted_course is None:
                raise ErrorHandler({
                    'description': 'Course does not exist.',
                    'status_code': 404
                })
            Course.delete(deleted_course)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def update_course(self, course_code, course):
        try:
            updated_course = Course.query.filter_by(course_code=course_code).first()
            if updated_course is None:
                raise ErrorHandler({
                    'description': 'Course does not exist.',
                    'status_code': 404
                })
            updated_course = Course(**course)
            updated_course.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            }) 
        return updated_course.serialize()

    def post_course(self, course):
        try:
            post_owner_controller.post_owner()
            post_owner_id = post_owner_controller.get_newest_owner_id()
            course['post_owner_id']=post_owner_id
            new_course = Course(**course)
            new_course = Course.insert(new_course)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return new_course

    def get_all_courses(self):
        courses = Course.query.all()
        if courses is None:
            raise ErrorHandler({
                'description': 'Course does not exist.',
                'status_code': 404
            })
        data = [n.serialize() for n in courses]
        for course in data:
            code = course['course_code']
            professors = Teaches_Relation.query.filter(Teaches_Relation.course_code==code).all()
            professors = [professor.serialize() for professor in professors]   
            course['professors'] = []
            if len(professors) > 0:
                for professor in professors:
                    new_professor = User.query.filter(User.user_id==professor['professor_id']).first().serialize()
                    course['professors'].append(new_professor)

        return data

    def search_for_a_course(self,name_string):
        data=Course.query.filter(Course.course_name.ilike(f'%{name_string}%')).all()
        return [d.serialize() for d in data]