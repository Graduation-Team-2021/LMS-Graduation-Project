export const SET_TOKEN = "SET_TOKEN";
export const SET_NAME = "SET_NAME";
export const SET_ID = "SET_ID";
export const SET_ROLE = "SET_ROLE";
export const SET_DATA = "SET_DATA";
export const SET_DATA_DATA = "SET_DATA_DATA";

export const setToken = (newToken) => {
  return {
    type: SET_TOKEN,
    value: newToken,
  };
};

export const setDataData = (newData) => {
  return {
    type: SET_DATA_DATA,
    value: newData,
  };
};

export const setName = (newName) => {
  return {
    type: SET_NAME,
    value: newName,
  };
};
export const setID = (newID) => {
  return {
    type: SET_ID,
    value: newID,
  };
};
export const setRole = (newRole) => {
  return {
    type: SET_ROLE,
    value: newRole,
  };
};

export const setData = (newData) => {
    return {
      type: SET_DATA,
      value: newData,
    };
  };