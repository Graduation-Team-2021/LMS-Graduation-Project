export const SET_RECENT_EVENTS ='SET_RECENT_EVENTS';

export const setRecentEvent = (newEvents) =>{
    return{
        type: SET_RECENT_EVENTS,
        value:newEvents
    }
}