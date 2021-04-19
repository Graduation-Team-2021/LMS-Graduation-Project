import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import userDataReducer from "./store/reducers/userDataReducer";
import currentCoursesReducer from './store/reducers/currentCoursesReducer'
import currentGroupsReducer from './store/reducers/currentGroupsReducer'
import recentEventsReducer from './store/reducers/recentEventsReducer'
import finishedCoursesReducer from './store/reducers/finishedCoursesReducer'
import recentUserPostsReducer from './store/reducers/recentUserPostsReducer'


const rootReducer = combineReducers({
  userDataReducer: userDataReducer,
  currentCoursesReducer: currentCoursesReducer,
  currentGroupsReducer: currentGroupsReducer,
  recentEventsReducer: recentEventsReducer,
  finishedCoursesReducer: finishedCoursesReducer,
  recentUserPostsReducer: recentUserPostsReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
