from models.course.courses import Course
from methods.errors import *

class courses_controller():
    def get_course(self,course_code):
     course = Course.query.filter_by(course_code=course_code).first()
     if course is None:
        raise ErrorHandler({
                'description':'Course does not exist.',
                'status_code': 404
                })
     return course.serialize()

    def delete_course(self,course_code):
        deleted_course = Course.query.filter_by(course_code=course_code).first()
        if deleted_course is None:
            raise ErrorHandler({
                'description':'Course does not exist.',
                'status_code': 404
                })
        Course.delete(course)
        return 

    def update_course(self,course_code,course):
        updated_course = Course.query.filter_by(course_code=course_code)
        if updated_course is None:
            raise ErrorHandler({
                'description':'Course does not exist.',
                'status_code': 404
                })
        updated_course = Course(**course)
        updated_course.update()
        return updated_course.serialize()

    def post_course(self,course):
        new_course = Course(**course)
        new_course = Course.insert(new_course)
        return new_course

    
    def get_all_courses(self):
        courses = Course.query.all()
        if courses is None:
            raise ErrorHandler({
                'description':'Course does not exist.',
                'status_code': 404
                })
        data = [course.serialize() for course in courses]
        return (data)   

    
         

    