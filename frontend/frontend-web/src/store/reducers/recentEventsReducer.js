import { SET_RECENT_EVENT } from "../actions/recentEventActions";

const initialState = {
  recentEvent: null,
};
const reducer = (state = initialState, action) => {
  if (action.type === SET_RECENT_EVENT) {
    return {
      ...state,
      recentEvent: action.value,
    };
  }
  return state;
};
export default reducer;
