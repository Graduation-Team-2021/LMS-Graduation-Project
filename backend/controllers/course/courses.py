from backend.models.course.courses import Course
from backend.methods.errors import *

class courses_controller():
    def get_course(self,course_code):
     course = Course.query.filter_by(course_code=course_code).first()
     if course is None:
        raise CourseNotFound
     return course.serialize()

    def delete_course(self,course_code):
        course = Course.query.filter_by(course_code=course_code).first()
        if course is None:
            raise CourseNotFound
        deleted_course = Course.delete(course)
        return deleted_course

    def update_course(self,course_code,course):
        updated_course = Course.query.filter_by(course_code=course_code)
        if course is None:
            raise CourseNotFound
        updated_course = Course(**course)
        updated_course.update()
        return updated_course.serialize()

    def post_course(self,course):
        new_course = Course(**course)
        new_course = Course.insert(new_course)
        return new_course

    
    def get_all_courses(self):
        courses = Course.query.all()
        if course is None:
            raise CourseNotFound
        data = [course.serialize() for course in courses]
        return (data)   

    
         

    