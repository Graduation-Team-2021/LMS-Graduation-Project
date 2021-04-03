export const SET_RECENT_EVENT ='SET_RECENT_EVENT';

export const setRecentEvent = (newEvents) =>{
    return{
        type: SET_RECENT_EVENT,
        value:newEvents
    }
}