export const SET_CURRENT_MESSAGE ='SET_CURRENT_MESSAGE';

export const setCurrentMessage = (newMessage) =>{
    return{
        type: SET_CURRENT_MESSAGE,
        value:newMessage
    }
}