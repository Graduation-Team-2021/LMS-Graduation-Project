import React, { Component } from "react";
import validator from "validator";

import classes from "./SignUp.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import SignUpField from "../../Components/SignUpField/SignUpField";
import Button from "../../Components/Button/Button";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import { SignUp } from "../../Interface/Interface";
import { setNewUser } from "../../Models/User";

class SignUpPage extends Component {
  state = {
    data: {
      UserName: "",
      Email: "",
      Password: "",
      NationalID: "",
      Birthday: (new Date()).toISOString().slice(0, 10),
      Role: "",
    },
    errors: {
      UserNameError: false,
      EmailError: false,
      NationalIDError: false,
      BirthdayError: false,
      RoleError: false,
      PasswordError: false,
    },
  };

  initSignup = () => {
    this.setState({
      data: {
        UserName: "",
        Email: "",
        Password: "",
        NationalID: "",
        Birthday: (new Date()).toISOString().slice(0, 10),
        Role: "",
      },
      errors: {
        UserNameError: false,
        EmailError: false,
        NationalIDError: false,
        BirthdayError: false,
        RoleError: false,
        PasswordError: false,
      },
    });
  };

  errorHandler = () => {
    let keys = Object.keys(this.state.data);
    let errors = this.state.errors;

    keys.forEach((element) => {
      if (
        (this.state.data[element] === "") 
      ) {
        errors[`${element}Error`] = true;
      }
    });
    this.setState((st, pro) => ({
      data: { ...st.data },
      errors: { ...errors },
    }));
    let error = Object.values(errors);
    return error.every((value) => !value);
  };

  onSignUp = async () => {
    if (this.errorHandler()) {
      let user = setNewUser(this.state.data);
      let res = await SignUp(user);
      if (res.status_code===200) {
        alert("Sign Up Succesful");
        this.initSignup();
      } else {
        console.log(res)
        alert(res.description);
      }
    }
  };

  onBirthdayChange = (value) => {
    console.log(value);
    this.setState((prevState) => {
      return {
        errors: { ...prevState.errors , BirthdayError: false},
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

  render() {
    document.title="Add New User"
    const signupField = (
      <SignUpField
        {...this.state.errors}
        {...this.state.data}
        onChange={this.changeInput}
        checked={this.state.data.Agreed}
        onBirthdayChange={this.onBirthdayChange}
      />
    );
    return (
      <Card row shadow>
        <div className={classes.Login}>
          <h1 className={classes.MainTitle}>Add New User</h1>
          <div className={classes.Field}>{signupField}</div>
          <div className={classes.ButtonArea}>
            <Button onClick={this.onSignUp} >Add User</Button>
          </div>
        </div>
        <div className={classes.Blue}>
          <ImageHolder filler={image} />
        </div>
      </Card>
    );
  }
}

export default SignUpPage;
