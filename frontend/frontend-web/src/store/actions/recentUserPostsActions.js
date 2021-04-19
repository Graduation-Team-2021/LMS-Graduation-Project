export const SET_USER_RECENT_POSTS = 'SET_USER_RECENT_POSTS';

export const setUserRecentPosts = (newPosts) =>{
    return{
        type: SET_USER_RECENT_POSTS,
        value: newPosts
    }
}