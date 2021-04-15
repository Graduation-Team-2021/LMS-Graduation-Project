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

  initSignup = () => {
    this.setState({
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
    });
  };

  errorHandler = () => {
    let keys = Object.keys(this.state.data);
    let errors = this.state.errors;
    
    keys.forEach((element) => {
      if (
        (this.state.data[element] === "" && element !== "Agreed") ||
        (this.state.data[element] === false && element === "Agreed")
      ) {
        errors[`${element}Error`] = true;
      }
    });
    this.setState((st, pro) => ({
      data: { ...st.data },
      errors: { ...errors },
    }));
    let error = Object.values(errors);
    return error.every((value)=>!value);
  };

  onSignUp = async () => {
    if (this.errorHandler()) {
      let user = setNewUser(this.state.data);
      let res = await SignUp(user);
      if (res) {
        alert("Sign Up Succesful");
        this.initSignup();
      } else {
        alert("Sign Up failed");
      }
      this.initSignup();
    }
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
      <div className={classes.Main}>
        <Card row shadow>
          <div className={classes.Login}>
            <h1 className={classes.MainTitle}>Add New User</h1>
            <div className={classes.Field}>{signupField}</div>
            <div className={classes.ButtonArea}>
              <Button value="Add User" onClick={this.onSignUp} />
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

export default SignUpPage;
