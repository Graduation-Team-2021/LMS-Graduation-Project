from models.course.exams.results import Results

from methods.errors import *


class results_controller():
    def post_results(self, results):
        try:
            results = Results(**results)
            results = Results.insert(results)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            raise ErrorHandler({
                'description': error,
                'status_code': 500
            })
        return 

   
