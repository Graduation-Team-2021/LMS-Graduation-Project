export const SET_FINISHED_COURSES ='SET_FINISHED_COURSES';

export const setFinishedCourses = (newCourses) =>{
    return{
        type: SET_FINISHED_COURSES,
        value:newCourses
    }
}