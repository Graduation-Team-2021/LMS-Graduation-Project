import {SET_RECENT_EVENTS} from '../actions/recentEventActions'

const initialState = {
    recentEvents:[],
}
const reducer = (state= initialState, action) => {
    if (action.type ===SET_RECENT_EVENTS){
        return{
            ...state,
            recentEvents: action.value
        }
    }
    return state
}
export default reducer;
