import React, { Component } from "react";
import validator from "validator";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NormalTextField from "../../Components/NormalTextField/NormalTextField";
import Button from "../../Components/Button/Button";
import classes from "./ResetPass.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";

import { changePassword } from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

class ResetPass extends Component {
  Fields = {
    "Password": "password",
    "Repeat Password": "password",
  };

  constructor(props) {
    super(props);
    let Data = {};
    let Error = {};
    let Lists = {};
    Object.keys(this.Fields).forEach((value) => {
      Data[value] = "";
      Error[value] = false;
      if (this.Fields[value] === "number") {
        Data[value] = 0;
      } else if (this.Fields[value] === "select") {
        Data[value] = [];
        Lists[value] = [];
      }
    });
    this.state = {
      Fields: this.Fields,
      Data: Data,
      Error: Error,
      ...Lists,
    };
  }

  initChangePassword = () => {
    let Data = {};
    let Error = {};
    Object.keys(this.Fields).forEach((value) => {
      Data[value] = "";
      Error[value] = false;
    });
    this.setState({
      Fields: this.Fields,
      Data: Data,
      Error: Error,
    });
  };

  errorHandler = () => {
    let keys = Object.keys(this.state.Fields);
    let Error = this.state.Error;
    keys.forEach((element) => {
      if (this.state.Data[element] === "") {
        Error[element] = true;
      }
      if (
        element === "Repeat Password" &&
        this.state.Data[element] !== this.state.Data["Password"]
      ) {
        Error[element] = true;
      }
    });
    this.setState((st, pro) => ({
      Data: { ...st.Data },
      Error: { ...Error },
    }));
    let error = Object.values(Error);
    return error.every((value) => !value);
  };

  onChangePassword = async () => {
    if (this.errorHandler()) {
      let res = await changePassword(
        this.props.userData.ID,
        this.state.Data["Password"]
      );
      if (res) {
        alert("Password Changed Succesfully");
        this.initChangePassword();
      } else {
        alert("Password failed to Change");
      }
      this.initChangePassword();
    }
  };

  /* onBirthdayChange = (value) => {
    this.setState((prevState) => {
      return {
        Error: { ...prevState.Error },
        Data: { ...prevState.Data, Birthday: value },
      };
    });
  }; */

  changeInput = (event) => {
    let x = false;
    if (event.target.type === "number") {
      x = !event.target.value > 0;
    } else if(event.target.name==='Repeat Password' && event.target.value !== this.state.Data['Password']){
      x=true
    }
    else{
      x = validator.isEmpty(event.target.value);
    }

    this.setState((prevState) => {
      return {
        Error: { ...prevState.Error, [event.target.name]: x },
        Data: {
          ...prevState.Data,
          [event.target.name]: event.target.value,
        },
      };
    });
  };

  render() {
    document.title="Reset Password"

    const ChangePasswordField = (
      <React.Fragment>
        {Object.keys(this.state.Fields).map((value, index) => {
          return (
            <NormalTextField
              key={index}
              value={this.state.Data[value]}
              type={this.state.Fields[value]}
              Name={value}
              onChange={this.changeInput}
              Error={this.state.Error[value]}
            />
          );
        })}
      </React.Fragment>
    );
    return (
      <span className={classes.Holder}>
        <Card row shadow className={classes.Card}>
          <div className={classes.Login}>
            <h1 className={classes.MainTitle}>Reset Password</h1>
            <div className={classes.Field}>{ChangePasswordField}</div>
            <div className={classes.ButtonArea}>
              <Button onClick={this.onChangePassword}>Reset Password</Button>
            </div>
          </div>
          <div className={classes.Blue}>
            <ImageHolder filler={image} />
          </div>
        </Card>
    </span>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPass)
);
