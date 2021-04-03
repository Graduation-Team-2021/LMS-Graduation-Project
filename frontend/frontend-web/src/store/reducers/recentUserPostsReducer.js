import {SET_USER_RECENT_POSTS} from '../actions/recentUserPostsActions'

const initialState = {
    userRecentPosts:[]
}
const reducer = (state=initialState, action) => {
    if(action.type===SET_USER_RECENT_POSTS){
        return{
            ...state,
            current: action.value
        }
    }
    return state
}
export default reducer;