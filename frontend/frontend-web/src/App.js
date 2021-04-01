import React from "react";
import MainPage from "./Containers/MainPage/MainPage";
import HomePage from "./Containers/HomePage/HomePage";
import Login from "./Containers/LoginPage/LoginPage";
import {mapStateToProps,mapDispatchToProps} from "./store/reduxMaps"
import {connect} from "react-redux"

import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

const App = (props) => {
  console.log('[App.js]', props)
  return (
    <BrowserRouter>
      {props.userData.Token ? (
        <MainPage>
          <Switch>
            <Route path="/" exact component={HomePage} />
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
