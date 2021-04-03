import {SET_CURRENT_GROUPS} from '../actions/currentGroupsActions'

const initialState = {
    currentGroups:new Map(),
}
const reducer = (state= initialState, action) => {
    if (action.type===SET_CURRENT_GROUPS) {
        return {
            ...state,
            currentGroups: action.value
        }
    }
    return state
}
export default reducer;
