export const setCourse = (id) => {
  let data = {
    CourseID: id["course_code"],
    CourseName: id["course_name"],
    DoctorName: id["professors"].map(value=>value['name']),
    CourseDescription: id["course_description"],
    PostID: id["post_owner_id"],
    isEnrolled: id['isenrolled'],
    CoursePic: id['course_pic'],
    mid: id['mid'],
    final: id['final']
  };
  return data;
};

export const setNewCourse = (Data) => {
  let newData = {
    course_code: Data["Course Code"],
    course_name: Data["Course Name"],
    weekly_hours: Data["Weekly Hours"],
    group_number: Data["Number of Groups"],
    max_students: Data["Max Number of Students"],
    course_description: Data["Course Description"],
    post_owner_id: Data['post_owner_id'],
    course_deadline: Data['Enrollment Deadline'],
    course_pic: Data["Course Picture(Optional)"],
    final: Data['Final Grades'],
    mid: Data['Midterm Grades'],
    pre: Data['Prerequisites'].map(val => val.value),
    doctors: Data["List of Doctors"].map(val => val.value)
  };
  return newData;
};
