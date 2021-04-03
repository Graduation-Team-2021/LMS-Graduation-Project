import React, { Component } from "react";
import LoginField from "../../Components/LoginField/LoginField";
import Button from "../../Components/Button/Button";
import classes from "./LoginPage.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";

import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { login } from "../../Interface/Interface";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Radium, { StyleRoot } from 'radium';

class LoginPage extends Component {
  state = {
    Email: "",
    Password: "",
    EmailError: false,
    PasswordError: false,
  };

  signin = () =>
    this.handleSigninCLicked((Data) => {
      login(Data).then((res) => {
        if (res) {
          localStorage.setItem("token", res.Token);
          localStorage.setItem("name", res.name);
          this.props.userDataActions.onSetToken(res.Token);
          this.props.userDataActions.onSetName(res.name);
          this.props.userDataActions.onSetId(jwt_decode(res.Token).id);
          this.props.userDataActions.onSetRole(
            jwt_decode(res.Token).permissions
          );
          this.props.history.push("/");
        } else alert("Login Failed");
      });
    });

  handleSigninCLicked = (callBack) => {
    if (this.state.Email !== "" && this.state.Password !== "") {
      //This is where you add the Sign in Logic
      callBack({
        email: this.state.Email,
        password: this.state.Password,
      });
    } else {
      this.HandleSigninError();
    }
  };

  changeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (this.state[event.target.name + "Error"]) {
      this.setState({
        [event.target.name + "Error"]: false,
      });
    }
  };

  HandleSigninError() {
    if (this.state.Email === "") {
      this.setState({
        EmailError: true,
      });
    }
    if (this.state.Password === "") {
      this.setState({
        PasswordError: true,
      });
    }
  }

  initSignin() {
    this.setState({
      logging_in: true,
      UserName: "",
      Email: "",
      Password: "",
      Agreed: false,
      UserNameError: false,
      EmailError: false,
      PasswordError: false,
      AgreedError: false,
    });
  }

  render() {
    return (
      <div className={classes.Main}>
        <Card 
          className={classes.Card}
          row
          shadow
        >
          <div className={classes.Login}>
            <h1 className={classes.MainTitle}>Get Started</h1>
            <div className={classes.LoginMain}>
              <LoginField
                EmailError={this.state.EmailError}
                onChange={this.changeInput}
                PasswordError={this.state.PasswordError}
              />
            </div>
            <div className={classes.ButtonArea}>
              <Button value="Sign in" onClick={this.signin} />
            </div>
          </div>
          <div className={classes.Blue}>
            <ImageHolder filler={image} />
          </div>
        </Card>
      </div>
    );
  }
}

export default (withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
));
