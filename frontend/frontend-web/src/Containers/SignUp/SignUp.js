import React, { Component } from "react";
import SignUpField from "../../Components/SignUpField/SignUpField";

class SignUp extends Component {
  state = {
    UserName: "",
    Email: "",
    Password: "",
    Agreed: false,
    UserNameError: false,
    EmailError: false,
    PasswordError: false,
    AgreedError: false,
  };

  signup = () =>
    this.handleSignupCLicked(() => {
      alert("Sign up Sucessfully");
      this.props.SignUp();
    });

  handleSignupCLicked = (callBack) => {
    if (
      this.state.UserName !== "" &&
      this.state.Email !== "" &&
      this.state.Password !== "" &&
      this.state.Agreed
    ) {
      callBack();
    } else {
      this.HandleSignupError();
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

  changeAgreed = () => {
    this.setState((prevstate) => {
      return {
        Agreed: !prevstate.Agreed,
      };
    });
    if (this.state.AgreedError) {
      this.setState({
        AgreedError: false,
      });
    }
  };

  HandleSignupError() {
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
    if (this.state.UserName === "") {
      this.setState({
        UserNameError: true,
      });
    }
    if (!this.state.Agreed) {
      this.setState({
        AgreedError: true,
      });
    }
  }

  initSignup() {
    this.setState({
      logging_in: false,
      UserName: "",
      Email: "",
      Password: "",
      Agreed: false,
      UserNameError: false,
      EmailError: false,
      PasswordError: false,
    });
  }

  render() {
    const signupField = (
      <SignUpField
        UserNameError={this.state.UserNameError}
        EmailError={this.state.EmailError}
        onChange={this.changeInput}
        PasswordError={this.state.PasswordError}
        checked={this.state.Agreed}
        changeAgreed={this.changeAgreed}
        AgreedError={this.state.AgreedError}
      />
    );
    return signupField;
  }
}

export default SignUp;
