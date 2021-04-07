import React, { Component } from "react";

import SignUpField from "../../Components/SignUpField/SignUpField";
import classes from "./SignUp.module.css";
import Button from "../../Components/Button/Button";
import validator from "validator";

class SignUp extends Component {
  state = {
    data: {
      UserName: "",
      Email: "",
      Password: "",
      Agreed: false,
      NationalID: "",
      Birthday: "",
      Role: "",
    },
    errors: {
      UserNameError: false,
      EmailError: false,
      NationalIDError: false,
      BirthdayError: false,
      RoleError: false,
      PasswordError: false,
      AgreedError: false,
    },
  };

  onBirthdayChange = (value) => {
    this.setState((prevState) => {
      return {
        errors: { ...prevState.errors },
        data: { ...prevState.data, Birthday: value },
      };
    });
  };

  changeInput = (event) => {
    let x = false;
    if (event.target.name === "Email") {
      x = !validator.isEmail(event.target.value);
    } else if (event.target.name === "NationalID") {
      x = !(
        validator.isNumeric(event.target.value) &&
        event.target.value.length === 14
      );
    } else {
      x = validator.isEmpty(event.target.value);
    }

    this.setState((prevState) => {
      return {
        errors: { ...prevState.errors, [event.target.name + "Error"]: x },
        data: {
          ...prevState.data,
          [event.target.name]:
            event.target.name !== "Birthday" ? event.target.value : null,
        },
      };
    });
    // if (this.state.errors[event.target.name + "Error"]) {
    //   this.setState({
    //     [event.target.name + "Error"]: false,
    //   });
    // }
  };

  changeAgreed = () => {
    this.setState((prevstate) => {
      return {
        data: { ...prevstate.data, Agreed: !prevstate.data.Agreed },
      };
    });
    if (this.state.AgreedError) {
      this.setState({
        AgreedError: false,
      });
    }
  };

  render() {
    const signupField = (
      <SignUpField
        {...this.state.errors}
        {...this.state.data}
        onChange={this.changeInput}
        checked={this.state.data.Agreed}
        changeAgreed={this.changeAgreed}
        onBirthdayChange={this.onBirthdayChange}
      />
    );

    return (
      <div className={classes.Login}>
        <h1 className={classes.MainTitle}>Add New User</h1>
        <div className={classes.Main}>{signupField}</div>
        <Button
          value="Add User"
          onClick={() => {
            console.log("[SignUp] Implement the Add User Button");
          }}
        />
      </div>
    );
  }
}

export default SignUp;
