export const setCourse=(id)=>{
    let data = {
        CourseID: id["course_code"],
        CourseName: id["course_name"],
        DoctorName: id["course_teacher"],
        CourseDescription: id["course_description"],
        PostID: id["post_owner_id"],
        CoursePicture: id['pic'],
        isEnrolled: id['isenrolled']
      }
    return data
}

export const setNewCourse=(Data)=>{
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