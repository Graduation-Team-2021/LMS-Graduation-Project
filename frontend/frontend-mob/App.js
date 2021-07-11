import React from "react";
import HomeNav from "./navigators/AuthNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { Provider as PaperProvider } from "react-native-paper";

import userDataReducer from "./store/reducers/userDataReducer";
import currentCoursesReducer from "./store/reducers/currentCoursesReducer";
import currentGroupsReducer from "./store/reducers/currentGroupsReducer";
import recentEventsReducer from "./store/reducers/recentEventsReducer";
import finishedCoursesReducer from "./store/reducers/finishedCoursesReducer";
import recentUserPostsReducer from "./store/reducers/recentUserPostsReducer";
import FlashMessage from "react-native-flash-message";
const rootReducer = combineReducers({
  userDataReducer: userDataReducer,
  currentCoursesReducer: currentCoursesReducer,
  currentGroupsReducer: currentGroupsReducer,
  recentEventsReducer: recentEventsReducer,
  finishedCoursesReducer: finishedCoursesReducer,
  recentUserPostsReducer: recentUserPostsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (

    <PaperProvider>
      <Provider store={store}>
        <HomeNav />
      </Provider>
    </PaperProvider>

  );
}
