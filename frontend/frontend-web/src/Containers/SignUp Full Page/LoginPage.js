import React, { Component } from "react";
import Login from "../SignUp/SignUp";
import classes from "./LoginPage.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";

class LoginPage extends Component {
  render() {
    return (
      <div className={classes.Main}>
        <Card row shadow>
          <Login SignIn={this.props.SignIn} SignUp={this.props.SignUp} />
          <div className={classes.Blue}>
            <img src={image} alt="" className={classes.Image} />
          </div>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
