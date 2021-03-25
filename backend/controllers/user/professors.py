from models.user.professors import Professor
from models.user.users import User
from methods.errors import *
from flask import jsonify


class professors_controller():
    def get_professor(self, prof_id):
        try:
            professors = Professor.query.join(User).filter(User.user_id == prof_id).with_entities(User.name, User.email,User.birthday,User.national_id,Professor.scientific_degree)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        professor = [professor for professor in professors]
        # professor = Professor.query.filter_by(user_id=prof_id).first()
        if not professor:
            raise ErrorHandler({
                'description': 'Professor does not exist.',
                'status_code': 404
            })
        # return {'name': professor[0][0], 'email': professor[0][1], 'national_id': professor[0][2],
        #         'id': professor[0][4], 'scientific_degree': professor[0][3], "birthday": professor[0][5]}
        return {'name': professor[0][0], 'email': professor[0][1],"birthday": professor[0][2],'national_id':professor[0][3],'scientific_degree':professor[0][4]}
        # return professor

    def delete_professor(self, prof_id):
        try:
            deleted_professor = Professor.query.filter_by(user_id=prof_id).first()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })

        if deleted_professor is None:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })
        Professor.delete(deleted_professor)
        return

    def update_professor(self, prof_id, professor):
        updated_professor = Professor.query.filter_by(user_id=prof_id).first()
        if updated_professor is None:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })

        updated_professor = Professor(**professor)
        try:
            updated_professor.update()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return updated_professor.serialize()

    def post_professor(self, professor):
        new_professor = Professor(**professor)
        try:
            new_professor = Professor.insert(new_professor)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        return new_professor

    def get_all_professors(self):
        try:
            professors = Professor.query.all()
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 404
            })
        if professors is None:
            raise ErrorHandler({
                'description': 'Student does not exist.',
                'status_code': 404
            })
        data = [professor.serialize() for professor in professors]
        return data
