from controllers.relations.delivers import delivers_controller
from flask_restful import Resource, reqparse
from methods.auth import *
from models.course.deliverables import Deliverables

controller_object = delivers_controller()


# /student/<student_id>/deliverables
class Delivers_Relation(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_id', type=int, location='json')
        self.reqparse.add_argument('group_id', type=int, location='json')
        self.reqparse.add_argument('student_id', type=int, location='json')

    def get(self, student_id):
        try:
            specific_student_deliverables = controller_object.get_one_student_all_deliverables(student_id)
        except ErrorHandler as e:
            return e.error
        return specific_student_deliverables
        # try:
        #     delivers = controller_object.get_deliverable( student_id)
        # except ErrorHandler as e:
        #     return e.error
        # return Deliverables.query.filter_by(deliverable_id=delivers["deliverable_id"]).first().serialize()

    def post(self, student_id):
        args = self.reqparse.parse_args()
        deliverable = {
            "deliverable_id": args["deliverable_id"],
            "student_id": student_id
        }
        try:
            controller_object.post_deliverable(deliverable)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable added successfully',
            'status_code': 200
        })


# /deliverables/<deliverable_id>/students/<student_id>
class Delete_Deliverable(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('deliverable_id', type=int, location='json')
        self.reqparse.add_argument('group_id', type=int, location='json')
        self.reqparse.add_argument('student_id', type=int, location='json')

    def put(self, deliverable_id, student_id):
        args = self.reqparse.parse_args()
        deliver = {
            'deliverable_id': args['deliverable_id'], 'group_id': args['group_id'], 'student_id': args['student_id']}
        try:
            controller_object.update_deliverable(deliverable_id, student_id, deliver)
        except ErrorHandler as e:
            return e.error
        return jsonify({'message': 'deliver updated successfully', 'status_code': 200})

    def delete(self, deliverable_id, student_id):
        try:
            controller_object.delete_deliverable(deliverable_id, student_id)
        except ErrorHandler as e:
            return e.error
        return jsonify({
            'message': 'deliverable deleted successfully',
            'status_code': 200
        })

# class upload_file(Resource):
#     post:
#         upload_file
# class EachCourseDeliverables:
#     def __init__(self):
#         self.reqparse = reqparse.RequestParser()
#         self.reqparse.add_argument('course_deliverables', type=int, location='json')
#         self.reqparse.add_argument('deliverable_id', type=int, location='json')
#
#     def get(self):
