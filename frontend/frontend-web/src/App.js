import React from "react";
import { connect } from "react-redux";
import { setToken } from "./store/actions/userDataActions";

import MainPage from "./Containers/MainPage/MainPage";
import HomePage from "./Containers/HomePage/HomePage";
import Login from "./Containers/Login Full Page/LoginPage";

import { Switch, BrowserRouter, Route } from "react-router-dom";

const App = (props) => {
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
        </Switch>
      )}
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userDataReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDataActions: {
      onSetToken: (newToken) => dispatch(setToken(newToken)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
