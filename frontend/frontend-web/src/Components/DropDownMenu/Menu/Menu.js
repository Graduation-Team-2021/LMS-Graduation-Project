import React from "react";
import { withRouter } from "react-router-dom";
import './Menu.module.css'

const Menu = (props) => {
  return (
    <React.Fragment>
      <h2 onClick={
        () => {
          props.history.push("/profile");
        }
      }>View Profile</h2>
      <h2>Open Settings</h2>
      <h2>Enroll in Courses</h2>
      <h2 onClick={
        () => {
          localStorage.removeItem('token');
          props.setLogged(false)
          props.history.push("/login");
        }}>Sign Out</h2>
    </React.Fragment>
  );
};

export default withRouter(Menu);
