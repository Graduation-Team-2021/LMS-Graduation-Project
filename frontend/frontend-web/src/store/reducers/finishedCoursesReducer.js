import {SET_FINISHED_COURSES} from '../actions/finishedCoursesActions'

const initialState = {
    finishedCourses:[],
}
const reducer = (state= initialState, action) => {
    if (action.type ===SET_FINISHED_COURSES){
        return{
            ...state,
            finishedCourses: action.value
        }
    }
    return state
}
export default reducer;
