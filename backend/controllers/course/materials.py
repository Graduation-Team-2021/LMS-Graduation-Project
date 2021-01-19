from models.course.materials import Materials
from methods.errors import ErrorHandler

class materials_controller():
    def get_Materials(self,course_code):
     materials = Materials.query.filter_by(course_material=course_code)
     #TODO: Handle SQLAlchemyError 
     if materials is None:
        raise ErrorHandler({
                'description':'Materials does not exist.',
                'status_code': 404
                })

     data = [material.serialize() for material in materials]
     return (data)   

    def delete_Material(self,material_id):
        deleted_Materials = Materials.query.filter_by(material_id=material_id).first()
        if deleted_Materials is None:
            raise ErrorHandler({
                'description':'Materials does not exist.',
                'status_code': 404
                })
        Materials.delete(deleted_Materials)
        return 

    def update_Material(self,material_id,material):
        updated_Materials = Materials.query.filter_by(material_id=material_id)
        if updated_Materials is None:
            raise ErrorHandler({
                'description':'Materials does not exist.',
                'status_code': 404
                })
        updated_Materials = Materials(**material)
        updated_Materials.update()
        return updated_Materials.serialize()

    def post_Materials(self,materials):
        new_Materials = Materials(**materials)
        new_Materials = Materials.insert(new_Materials)
        return new_Materials

    

    
         

    