import { SET_USER_RECENT_POSTS } from "../actions/recentUserPostsActions";

const initialState = {
  userRecentPosts: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === SET_USER_RECENT_POSTS) {
    return {
      ...state,
      userRecentPosts: action.value,
    };
  }
  return state;
};
export default reducer;
