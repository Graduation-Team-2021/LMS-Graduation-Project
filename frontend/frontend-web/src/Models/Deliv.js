export const setNewDeliv = (Deliv, id) => {
  let data = {
    course_deliverables: id,
    deliverable_name: Deliv["Deliverable Name"],
    students_number: Deliv["Max Number of Students"],
    description: Deliv["Description"],
    mark: Deliv["Marks"],
    deadline: Deliv["DeadLine"],
  };
  return data;
};
