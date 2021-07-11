import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SET_TOKEN,
  SET_NAME,
  SET_ID,
  SET_ROLE,
  SET_DATA,
} from "../actions/userDataActions";

const intialState = {
  Name: null,
  Role: null,
  ID: null,
  Token: null,
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
    };
  }
  return state;
};

export default reducer;
