import React, { useState, useEffect } from "react";

import MainPage from "./Containers/MainPage/MainPage";
import HomePage from "./Containers/HomePage/HomePage";

import jwt_decode from "jwt-decode";
import { Switch, BrowserRouter } from "react-router-dom";

const App = (props) => {
  const TokenError = () => {
    //TODO: Make this Global
    setToken(null);
  };
  const [name, setName] = useState(localStorage.getItem("name"));
  const [Role, setRole] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token")).permissions
      : null
  );
  const [ID, setID] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token")).id
      : null
  );
  const [Token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  return (
    <BrowserRouter>
      <MainPage Name={name}>
        <Switch>
          <HomePage Name={name} Role={Role} ID={ID} Token={Token} />
        </Switch>
      </MainPage>
    </BrowserRouter>
  );
};

export default App;
