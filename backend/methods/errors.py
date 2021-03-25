from sqlalchemy.exc import SQLAlchemyError


class ErrorHandler(Exception):
    def __init__(self, error):
        self.error = error
