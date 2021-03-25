import React, { Component } from "react";
import classes from "./Login.module.css";
import LoginField from "../../Components/LoginField/LoginField";
import ButtonArray from "../../Components/ButtonArray/ButtonArray";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

class Login extends Component {
  state = {
    Email: "",
    Password: "",
    EmailError: false,
    PasswordError: false,
  };

  signin = () =>
    this.handleSigninCLicked((Data) => {

      this.props.SignIn(Data).then((res) => {
        if (res) {
          console.log(jwt_decode(res))
          localStorage.setItem('token',res);
          this.props.history.push('/')
          this.props.Home()
        }
        else
          alert("Login Failed")
      })

    });

  handleSigninCLicked = (callBack) => {
    if (this.state.Email !== "" && this.state.Password !== "") {
      //This is where you add the Sign in Logic
      callBack({
        "email": this.state.Email,
        "password": this.state.Password
      });
    } else {
      this.HandleSigninError();
    }
  };

  changeInput = (event) => {
    console.log(event.target.value);
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
    const loginField = (
      <LoginField
        EmailError={this.state.EmailError}
        onChange={this.changeInput}
        PasswordError={this.state.PasswordError}
      />
    );

    return (
      <div className={classes.Login}>
        <h1 className={classes.MainTitle}>Get Started</h1>
        <div className={classes.Main}>{loginField}</div>
        <ButtonArray
          logging_in={this.state.logging_in}
          SigninCLicked={this.signin}
          SignupCLicked={this.signup}
        />
      </div>
    );
  }
}

export default withRouter(Login);
