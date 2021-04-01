import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import {setToken} from './store/actions/userDataActions'

import MainPage from "./Containers/MainPage/MainPage";
import HomePage from "./Containers/HomePage/HomePage";

import jwt_decode from "jwt-decode";
import { Switch, BrowserRouter } from "react-router-dom";

const App = (props) => {

  return (
    <BrowserRouter>
      <MainPage >
        <Switch>
          <HomePage  />
        </Switch>
      </MainPage>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) =>{
  return {
    userData: state.userDataReducer
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    userDataActions :{
      onSetToken: (newToken) => dispatch(setToken(newToken))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
