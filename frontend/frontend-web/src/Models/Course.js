export const setCourse=(id)=>{
    let data = {
        CourseID: id["course_code"],
        CourseName: id["course_name"],
        DoctorName: id["course_teacher"],
        CourseDescription: id["course_description"],
        PostID: id["post_owner_id"],
        CoursePicture: id['pic'],
      }
    return data
}