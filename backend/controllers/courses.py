from backend.models.courses import Course

class courses_controller():
    def get_course(self,course_code):
     course = Course.query.filter_by(course_code=course_code).one()
     if course is None:
        abort(404)
     return course.serialize()

    def delete_course(self,course_code):
        course = Course.query.filter_by(course_code=course_code).one()
        if course is None:
            abort(404)
        deleted_course = Course.delete(course)
        return deleted_course

    def update_course(self,course_code,course):
        updated_course = Course.query.filter_by(course_code=course_code)
        if updated_course is None:
            abort(404)
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
            abort(404)
        data = [course.serialize() for course in courses]
        return (data)    

    