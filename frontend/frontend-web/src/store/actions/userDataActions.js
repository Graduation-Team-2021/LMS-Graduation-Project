export const SET_TOKEN = "SET_TOKEN";
export const SET_NAME = "SET_NAME";
export const SET_ID = "SET_ID";
export const SET_ROLE = "SET_ROLE";


export const setToken = (newToken) => {
  return {
    type: SET_TOKEN,
    value: newToken,
  };
};



export const setName = (newName) => {
    return {
        type: SET_NAME,
        value: newName,
    }
}
export const setID = (newID) => {
    return {
        type: SET_ID,
        value: newID,
    }
}
export const setRole = (newRole) => {
    return {
        type: SET_ROLE,
        value: newRole
    }
}
