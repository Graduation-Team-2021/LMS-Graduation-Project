import React, { Component } from "react";
import SignUpField from "../../Components/SignUpField/SignUpField";
import classes from "./SignUp.module.css";
import Button from '../../Components/Button/Button'

class SignUp extends Component {
  state = {
    UserName: "",
    Email: "",
    Password: "",
    Agreed: false,
    NationalID: '',
    Birthday: '',
    Role: "",
    UserNameError: false,
    EmailError: false,
    NationalIDError: false,
    BirthdayError: false,
    RoleError: false,
    PasswordError: false,
    AgreedError: false,
  };

  signup = () =>
    this.handleSignupCLicked((Data) => {
      this.props.SignUp(Data);
    });

  handleSignupCLicked = (callBack) => {
    if (
      this.state.UserName !== "" &&
      this.state.Email !== "" &&
      this.state.NationalID !== "" &&
      this.state.Birthday !== "" &&
      this.state.Role !== "" &&
      this.state.Password !== "" &&
      this.state.Agreed
    ) {
      callBack(
        {
          "name": this.state.UserName,
          "email": this.state.Email,
          "national_id": this.state.NationalID,
          "birthday": this.state.Birthday,
          "password": this.state.Password,
          "role": this.state.Role
        }
      );
    } else {
      this.HandleSignupError();
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
    if (this.state.NationalID === "") {
      this.setState({
        NationalIDError: true,
      });
    }
    if (this.state.Birthday === "") {
      this.setState({
        BirthdayError: true,
      });
    }
    if (this.state.Role === "") {
      this.setState({
        RoleError: true,
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
      NationalIDError: false,
      BirthdayError: false,
      RoleError: false,
      EmailError: false,
      PasswordError: false,
    });
  }

  render() {
    const signupField = (
      <SignUpField
        UserNameError={this.state.UserNameError}
        EmailError={this.state.EmailError}
        NationalIDError={this.state.NationalIDError}
        BirthdayError={this.state.BirthdayError}
        RoleError={this.state.RoleError}
        onChange={this.changeInput}
        PasswordError={this.state.PasswordError}
        checked={this.state.Agreed}
        changeAgreed={this.changeAgreed}
        AgreedError={this.state.AgreedError}
      />
    );

    return <div className={classes.Login}>
      <h1 className={classes.MainTitle}>Get Started</h1>
      <div className={classes.Main}>{signupField}</div>
      <Button value='Add User' onClick={this.props.SignUp}/>
    </div>;
  }
}

export default SignUp;
