export const SET_CURRENT_GROUPS ='SET_CURRENT_GROUPS';

export const setCurrentGroups = (newGroups) =>{
    return{
        type: SET_CURRENT_GROUPS,
        value:newGroups
    }
}