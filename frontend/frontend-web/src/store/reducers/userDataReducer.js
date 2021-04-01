import jwt_decode from "jwt-decode";

import { SET_TOKEN } from "../actions/userDataActions";

const intialState = {
  Name: localStorage.getItem("name"),
  Role: localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token")).permissions
    : null,
  ID: localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token")).id
    : null,
  Token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const reducer = (state = intialState, action) => {
  console.log(action);
  if (action.type === SET_TOKEN) {
    return {
      ...state,
      Token: action.value,
    };
  }
  return state;
};

export default reducer;
