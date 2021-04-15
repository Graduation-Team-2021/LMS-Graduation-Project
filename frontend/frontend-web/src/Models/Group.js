export const setGroup = (ele) => {
  let data = {
    Title: ele["group_name"],
    Desc: ele["group_description"],
    Post: ele["post_owner_id"],
  };
  return data;
};

export const setNewGroup=(Data)=>{
  let newData = {
    course_code:Data['Course Code'],
    course_name:Data['Course Name'],
    weekly_hours:Data['Weekly Hours'],
    group_number:Data['Number of Groups'],
    max_students:Data['Max Number of Students'],
    course_description:Data['Course Description'],
  }
  return newData
}
