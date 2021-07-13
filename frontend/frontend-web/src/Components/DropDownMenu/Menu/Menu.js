import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../../store/reduxMaps";
import "./Menu.module.css";

const Menu = (props) => {
  return (
    <React.Fragment>
      <h2
        color="blue"
        onClick={() => {
          props.onClick();
          props.history.push("/Profile");
        }}
      >
        View Profile
      </h2>
      <h2
        onClick={() => {
          props.onClick();
          props.history.push("/Search");
        }}
      >
        Search
      </h2>
      <h2
        onClick={() => {
          props.onClick();
          props.history.push("/changePass");
        }}
      >
        Reset Password
      </h2>
      <h2
        onClick={() => {
          props.onClick();
          props.history.push({
            pathname: "/Courses",
            state: { enrolling: true },
          });
        }}
      >
        Enroll in Courses
      </h2>
      {/*TODO: onclick => GO To Enroll*/}
      <h2
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          props.userDataActions.onSetToken(null);
          props.onClick();
          props.history.push("/login");
        }}
      >
        Sign Out
      </h2>
    </React.Fragment>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
