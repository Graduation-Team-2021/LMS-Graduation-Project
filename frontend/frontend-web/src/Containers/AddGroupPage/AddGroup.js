import React, { Component } from "react";
import validator from "validator";

import classes from "./AddGroup.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import NormalTextField from "../../Components/NormalTextField/NormalTextField";
import Button from "../../Components/Button/Button";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import { AddGroup } from "../../Interface/Interface";
import { setNewGroup } from "../../Models/Group";

class AddGroupPage extends Component {
  state = {
    Data: {},
    Error: {},
  };

  Fields = {
    "Course Code": "text",
    "Course Name": "text",
    "Weekly Hours": "number",
    "Number of Groups": "number",
    "Max Number of Students": "number",
    "Course Description": "text",
    //'List of Doctors'
  };

  constructor(props) {
    super(props);
    let Data = {};
    let Error = {};
    Object.keys(this.Fields).forEach((value) => {
      Data[value] = "";
      Error[value] = false;
      if (value.includes("Hours") || value.includes("Number")) {
        Data[value] = 0;
      } else if (value.includes("List")) {
        Data[value] = [];
      }
    });
    this.state = {
      Data: Data,
      Error: Error,
    };
  }

  initAddCourse = () => {
    let Data = {};
    let Error = {};
    Object.keys(this.Fields).forEach((value) => {
      Data[value] = "";
      Error[value] = false;
      if (value.includes("Hours") || value.includes("Number")) {
        Data[value] = 0;
      } else if (value.includes("List")) {
        Data[value] = [];
      }
    });
    this.setState({
      Data: Data,
      Error: Error,
    });
  };

  errorHandler = () => {
    let keys = Object.keys(this.state.Data);
    let Error = this.state.Error;

    keys.forEach((element) => {
      if (this.state.Data[element] === "") {
        Error[element] = true;
      }
      if ((element.includes("Number")|| element.includes("Hours"))&&this.state.Data[element]===0 ){
        Error[element] = true;
      }
    });
    this.setState((st, pro) => ({
      Data: { ...st.Data },
      Error: { ...Error },
    }));
    let error = Object.values(Error);
    console.log(error);
    return error.every((value) => !value);
  };

  onAddCourse = async () => {
    console.log("adding", this.errorHandler());
    if (this.errorHandler()) {
      console.log('Valid');
      let Group = setNewGroup(this.state.Data);
      let res = await AddGroup(Group);
      if (res) {
        alert("Adding Course Succesful");
        this.initAddCourse();
      } else {
        alert("Adding Course failed");
      }
      this.initAddCourse();
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
    if (event.target.name.includes("Number")) {
      x = !event.target.value > 0;
    } else if (event.target.name === "Weekly Hours") {
      x = !(
        validator.isNumeric(event.target.value) &&
        event.target.value <= 12*7 &&
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
    const AddCourseField = (
      <React.Fragment>
        {Object.keys(this.Fields).map((value, index) => {
          return (
            <NormalTextField
              key={index}
              value={this.state.Data[value]}
              type={this.Fields[value]}
              Name={value}
              onChange={this.changeInput}
              Error={this.state.Error[value]}
            />
          );
        })}
      </React.Fragment>
    );
    return (
      <div className={classes.Main}>
        <Card row shadow>
          <div className={classes.Login}>
            <h1 className={classes.MainTitle}>Add New User</h1>
            <div className={classes.Field}>{AddCourseField}</div>
            <div className={classes.ButtonArea}>
              <Button value="Add Course" onClick={this.onAddCourse} />
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

export default AddGroupPage;
