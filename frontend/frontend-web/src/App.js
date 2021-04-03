import React from "react";
import MainPage from "./Containers/MainPage/MainPage";
import Home from "./Containers/HomePage/HomePage";
import Login from "./Containers/LoginPage/LoginPage";
import Profile from './Containers/ProfilePage/ProfilePage'
import Courses from './Containers/CoursesPage/CoursesPage'


import {mapStateToProps,mapDispatchToProps} from "./store/reduxMaps"
import {connect} from "react-redux"


import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

const App = (props) => {
  return (
    <BrowserRouter>
      {props.userData.Token ? (
        <MainPage>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/Courses" exact component={Courses} />
          </Switch>
        </MainPage>
      ) : (
        <Switch>
        <Route path="/login" exact component={Login} />
        <Redirect to='/login' />
        </Switch>
      )}
    </BrowserRouter>
  );
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
