import React, { Component } from "react";
import validator from "validator";

import classes from "./AddDeliv.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import NormalTextField from "../../Components/NormalTextField/NormalTextField";
import Button from "../../Components/Button/Button";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import { AddNewDeliv } from "../../Interface/Interface";
import { setNewDeliv } from "../../Models/Deliv";

class AddDelivPage extends Component {
  Fields = {
    "Deliverable Name": "text",
    "Marks": 'number',
    "DeadLine": 'datetime-local',
    "Max Number of Students": "number",
    Description: "textArea",
    //'List of Doctors'
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
      Data: Data,
      Error: Error,
      Fields: this.Fields,
      ...Lists,
    };
  }

  initAddDeliv = () => {
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
    this.setState({
      Data: Data,
      Error: Error,
      Fields: this.Fields,
      ...Lists,
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
        this.state.Fields[element] === "number" &&
        this.state.Data[element] === 0
      ) {
        Error[element] = true;
      }
      if (
        this.state.Fields[element] === "select" &&
        this.state.Data[element].length === 0
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

  onAddDeliv = async () => {
    if (this.errorHandler()) {
      let Deliv = setNewDeliv(this.state.Data, this.props.match.params.id);
      let res = await AddNewDeliv(Deliv);
      if (res) {
        alert("Adding Deliv Succesful");
        this.initAddDeliv();
      } else {
        alert("Adding Deliv failed");
      }
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
    } else if (event.target.name === "Weekly Hours") {
      x = !(
        validator.isNumeric(event.target.value) &&
        event.target.value <= 12 * 7 &&
        event.target.value > 0
      );
    } else {
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
    const AddDelivField = (
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
        <Card className={classes.Main} row shadow>
          <div className={classes.Login}>
            <h1 className={classes.MainTitle}>Add New Deliverable</h1>
            <div className={classes.Field}>{AddDelivField}</div>
            <div className={classes.ButtonArea}>
              <Button onClick={this.onAddDeliv}>Submit</Button>
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

export default AddDelivPage;
