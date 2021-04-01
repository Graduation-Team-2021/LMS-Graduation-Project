import {SET_CURRENT_COURSES} from '../actions/currentCoursesActions'

const initialState ={
    currentCourses: [],
}

const reducer = (state= initialState, action) => {
    if(action.type === SET_CURRENT_COURSES){
        return{ 
            ...state,
            currentCourses: action.value
        }
    }
    return state
}

export default reducer;