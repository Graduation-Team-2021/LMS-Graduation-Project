from models.relations.has_prerequistes import Prerequiste
from controllers.relations.has_prerequisites import prequisite_controller
from controllers.course.group_project import GroupProjectController
from controllers.relations.group_course_relation import group_course_controller
from controllers.relations.student_group_relation import StudentGroupRelationController
from models.course.courses import Course
from models.user.professors import Professor
from models.relations.teaches import Teaches_Relation
from controllers.course.post_owner import Post_owner_controller
from models.user.users import User
from methods.errors import *

post_owner_controller = Post_owner_controller()
group_object = GroupProjectController()
group_course_object = group_course_controller()
pre_object = prequisite_controller()
student_object = StudentGroupRelationController()

class courses_controller():

    def get_course(self, course_code):
        try:
            course = Course.query.filter_by(course_code=course_code).first()
        except SQLAlchemyError as e:
            error = str(e)
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
            deleted_course = Course.query.filter_by(
                course_code=course_code).first()
            if deleted_course is None:
                raise ErrorHandler({
                    'description': 'Course does not exist.',
                    'status_code': 404
                })
            Course.delete(deleted_course)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def update_course(self, course_code, course, doctors, pre):
        try:
            updated_course = Course.query.filter_by(
                course_code=course_code).first()
            if updated_course is None:
                raise ErrorHandler({
                    'description': 'Course does not exist.',
                    'status_code': 404
                })
            updated_course = Course(**course)
            updated_course.update()
            updated_course = updated_course.serialize()
            professors = Teaches_Relation.query.filter_by(
                course_code=course_code).all()
            pree = Prerequiste.query.filter_by(
                course_code=course_code).all()
            for p in professors:
                Teaches_Relation.delete(p)
            for prof in doctors:
                new_prof = Teaches_Relation(
                    **{"professor_id": prof, 'course_code': course_code})
                new_prof.insert()
            for p in pree:
                Prerequiste.delete(p)
            for p in pre:
                new_prof = Prerequiste(
                    **{"pre_course_code": p, 'course_code': course_code})
                new_prof.insert()
            original_groups = group_course_object.get_all_course_groups(updated_course["course_code"])
            students = []
            for group in original_groups:
                students.append(student_object.get_one_group_all_students(group['group_id']))
                group_object.delete_group(group['group_id'])
            students = [s for ss in students for s in ss]
            remaining = [s for s in students]
            for group in range(updated_course['group_number']):
                gid = group_object.insert_group({
                    "group_name": f'{updated_course["course_code"]} - Section {group+1}',
                    "group_description": f'This is the Group for Section {group+1} of the {updated_course["course_name"]} Course',
                    'group_pic': updated_course['course_pic']
                })
                group_course_object.add_group_course(course=updated_course["course_code"], group=gid)
                students = remaining
                remaining = []
                count = 0
                for stu in students:
                    if group==updated_course['group_number']-1 or (group<updated_course['group_number']-1 and count<updated_course['max_students']):
                        student_object.enroll_in_group(stu[1],gid)
                        count+=1
                    elif count==updated_course['max_students']:
                        remaining = [stu]
                    else:
                        remaining.append(stu)
                        
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return 

    def post_course(self, course):
        try:
            post_owner_controller.post_owner()
            post_owner_id = post_owner_controller.get_newest_owner_id()
            course['post_owner_id'] = post_owner_id
            new_course = Course(**course)
            new_course = Course.insert(new_course)
        except SQLAlchemyError as e:
            error = str(e)
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
            professors = Teaches_Relation.query.filter(
                Teaches_Relation.course_code == code).all()
            professors = [professor.serialize() for professor in professors]
            pre = pre_object.get_one_course_all_prequisites(code)
            course['pre'] = []
            if len(pre)>0:
                for p in pre:
                    course['pre'].append(self.get_course(p['pre_course_id']))
            course['professors'] = []
            if len(professors) > 0:
                for professor in professors:
                    new_professor = User.query.filter(
                        User.user_id == professor['professor_id']).first().serialize()
                    course['professors'].append(new_professor)

        return data

    def search_for_a_course(self, name_string):
        data = Course.query.filter(
            Course.course_name.ilike(f'%{name_string}%')).all()
        return [d.serialize() for d in data]
