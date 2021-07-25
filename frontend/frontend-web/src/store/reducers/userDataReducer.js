import jwt_decode from "jwt-decode";

import { SET_TOKEN,SET_NAME,SET_ID,SET_ROLE, SET_DATA, SET_PIC } from "../actions/userDataActions";

const intialState = {
  Name: localStorage.getItem("name"),
  Role: localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token")).permissions
    : null,
  ID: localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token")).id
    : null,
  Token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  Pic: localStorage.getItem("pic") !== 'null' ? localStorage.getItem("pic") : null
};

const reducer = (state = intialState, action) => {
  if (action.type === SET_TOKEN) {
    return {
      ...state,
      Token: action.value,
    };
  }
  if (action.type === SET_ID) {
    return {
      ...state,
      ID: action.value,
    };
  }
  if (action.type === SET_NAME) {
    return {
      ...state,
      Name: action.value,
    };
  }
  if (action.type === SET_ROLE) {
    return {
      ...state,
      Role: action.value,
    };
  }
  if (action.type === SET_DATA) {
    return {
      ...state,
      Token: action.value.Token,
      Name: action.value.Name,
      Role: action.value.Role,
      ID: action.value.ID,
      Pic: action.value.Pic,
    };
  }
  if (action.type === SET_PIC) {
    return {
      ...state,
      Pic: action.value,
    };
  }
  return state;
};

export default reducer;
