import {SET_CURRENT_MESSAGE} from '../actions/currentMessageAction'

const initialState = {
    currentMessage:{},
}
const reducer = (state = initialState, action) => {
    if (action.type===SET_CURRENT_MESSAGE) {
        return {
            ...state,
            currentMessage: action.value
        }
    }
    return state
}
export default reducer;
