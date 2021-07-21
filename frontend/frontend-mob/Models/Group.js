export const setGroup = (ele) => {
  let data = {
    CourseName: ele["group_name"],
    CourseDescription: ele["group_description"],
    PostID: ele["post_owner_id"],
    CoursePicture: ele["group_pic"],
  };
  return data;
};

export const setNewGroup = (Data) => {
  let newData = {
    group_name: Data["Group Name"],
    course_id: Data["Related Course"][0].value,
    group_description: Data["Group Description"],
    students: Data["List of Students"],
  };
  return newData;
};
