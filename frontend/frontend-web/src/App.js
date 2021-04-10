import React from "react";

import MainPage from "./Containers/MainPage/MainPage";
import Home from "./Containers/HomePage/HomePage";
import Login from "./Containers/LoginPage/LoginPage";
import Profile from "./Containers/ProfilePage/ProfilePage";
import Courses from "./Containers/CoursesPage/CoursesPage";
import Course from "./Containers/CoursePage/CoursePage";
import Group from './Containers/GroupPage/GroupPage.js'
import Mark_edit from "./Ibrahim/Mrak_edit.js"
import Group from './Containers/GroupPage/GroupPage.js';
import Messenger from './Components/Messenger/Messenger';

import { mapStateToProps, mapDispatchToProps } from "./store/reduxMaps";
import { connect } from "react-redux";

import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

const App = (props) => {
  return (
    <BrowserRouter>
      {props.userData.Token ? (
        <MainPage Name={props.userData.Name}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Profile" exact component={Profile} />
            <Route path="/Courses" exact component={Courses} />
            <Route path="/Course/:id" exact component={Course} />
            <Route path="/Group/:id" exact component={Group} />
            <Route path="/Mark_edit" exact component={Mark_edit} />
            <Route path="/Messenger" exact component={Messenger} />
            <Redirect path='/login' to='/'/>
          </Switch>
        </MainPage>
      ) : (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Redirect to="/login" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
