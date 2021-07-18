from models.course.exams.results import Results

from methods.errors import *


class results_controller():
    def get_student_results(self, student_id, exam_id):
        try:
            res = Results.query.filter_by(
                student_id=student_id, exam_id=exam_id).first()
            if res:
                return {"grades": res.serialize(), "status_code": 200}
            return {
                "description": "Student Hasn't Solved the Exam Yet",
                'status_code': 404
            }
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })

    def get_one_student_all_results(self, student_id):
        try:
            results = Results.query.filter_by(student_id=student_id).all()
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        data = [result.serialize() for result in results]
        return data
        # results_list = list()
        # for result in results:
        #     results_list.append(result.serialize())
        # return results_list

    def post_results(self, results):
        try:
            results = Results(**results)
            results = Results.insert(results)
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return

    def get_all_results(self):
        try:
            results = Results.query.all()
            data = [result.serialize() for result in results]
            return data
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })

    def update_result(self, student_id, exam_id, new_result):
        try:
            to_be_updated = Results.query.filter_by(
                student_id=student_id, exam_id=exam_id).first()
            if not to_be_updated:
                raise ErrorHandler("This result does not exist")
            to_be_updated.delete()
            new_result = Results(**new_result)
            new_result.update()
        except SQLAlchemyError as e:
            error = str(e)
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
