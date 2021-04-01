export const SET_CURRENT_COURSES ='SET_CURRENT_COURSES';

export const setRecentEvent = (newCourses) =>{
    return{
        type: SET_CURRENT_COURSES,
        value:newCourses
    }
}