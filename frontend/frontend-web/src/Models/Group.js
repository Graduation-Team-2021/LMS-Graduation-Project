export const setGroup = (ele) => {
  let data = {
    Title: ele["group_name"],
    Desc: ele["group_description"],
    Post: ele["post_owner_id"],
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
