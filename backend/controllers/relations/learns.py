from models.relations.learns import Learns_Relation
from models.course.courses import Course
from models.user.students import Student
from methods.errors import *
from flask import jsonify
from models.user.users import User


class student_course_relation_controller():
    def get_courses_by_student_id(self, student_id):
        try:
            courses = Learns_Relation.query.join(Student).filter(Student.user_id == student_id)\
                .join(Course).filter(Course.course_code == Learns_Relation.course_code).\
                with_entities(Course.course_code, Course.course_name,
                              Course.course_description, Course.post_owner_id)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        results_array = list()
        for i in courses:
            results_array.append(
                {
                    'course_code': i[0],
                    'course_name': i[1],
                    'course_description': i[2],
                    'post_owner_id': i[3]
                }
            )
        return results_array
        # data = [course for course in courses]
        # print(courses)
        # return data

    def get_students_in_course(self, course_code):
        try:
            courses = Learns_Relation.query.filter(Learns_Relation.course_code == course_code)\
                .join(Student).filter(Student.user_id==Learns_Relation.student_id)\
                .join(User).filter(User.user_id == Student.user_id).\
                with_entities(User.user_id, User.name)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        results_array = list()
        for i in courses:
            results_array.append(
                {
                    'user_id': i[0],
                    'name': i[1]
                }
            )
        return results_array

    def post_student_course_relation(self, student_course_relation):
        try:
            new_learns_relation = Learns_Relation(**student_course_relation)
            new_learns_relation = Learns_Relation.insert(new_learns_relation)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def update_student_course_relation(self, student_id, course_code, new_relation):
        relation = Learns_Relation.query.filter_by(
            student_id=student_id, course_code=course_code).first()
        if not relation:
            raise ErrorHandler(
                'relation does not exist,please recheck your data')
        relation = Learns_Relation(**new_relation)
        try:
            relation.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return relation.serialize()

    def delete_student_course_relation(self, student_id, course_code):
        try:
            relation = Learns_Relation.query.filter_by(
                student_id=student_id, course_code=course_code).first()
            if relation is None:
                raise ErrorHandler({
                    'description': 'relation not found',
                    'status_code': 500
                })
            Learns_Relation.delete(relation)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def get_all_students_in_one_course(self, course_code):
        students = Learns_Relation.query.filter_by(
            course_code=course_code).all()
        student_id_list = [s.serialize() for s in students]
        names = []
        for i in student_id_list:
            # names=[ n.serialize()["name"] for n in User.query.filter(User.user_id==i).all()]
            # User.query.filter(User.user_id==i).first()
            t2 = {}
            temp = User.query.filter(
                User.user_id == i["student_id"]).first().serialize()
            t2['name'] = temp['name']
            t2['id'] = temp['user_id']
            t2['mid'] = i['mid_term_mark']
            t2['final'] = i['final_exam_mark']
            names.append(t2)
        # s=[]
        # for i in range(len(names)):
        #     s.append( f"{names[i]}:{student_id_list[i]}")
        # return s
        return names

    def get_student_marks(self, student_id, course_code):
        return Learns_Relation.query.filter(student_id == student_id, course_code == course_code).first().serialize()
