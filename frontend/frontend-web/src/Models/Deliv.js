export const setNewDeliv=(Deliv,id)=>{
    let data = {
        course: id,
        name: Deliv["Deliverable Name"],
        no_students: Deliv["Max Number of Students"],
        Description: Deliv["Description"]
      }
    return data
}