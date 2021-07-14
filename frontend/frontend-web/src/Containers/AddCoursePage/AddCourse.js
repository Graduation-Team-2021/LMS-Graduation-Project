import React, { Component } from "react";
import validator from "validator";

import classes from "./AddCourse.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import NormalTextField from "../../Components/NormalTextField/NormalTextField";
import Button from "../../Components/Button/Button";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import { AddCourse, getDoctors } from "../../Interface/Interface";
import { setNewCourse } from "../../Models/Course";

class AddCoursePage extends Component {
  Fields = {
    "Course Code": "text",
    "Course Name": "text",
    "Weekly Hours": "number",
    "Number of Groups": "number",
    "Max Number of Students": "number",
    "Course Description": "textArea",
    "List of Doctors": "select",
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

  componentDidMount() {
    getDoctors().then((res) => {
      this.setState({
        "List of Doctors": res.professors.map((value) => ({
          name: value.name,
          value: value.id,
        })),
      });
    });
  }

  initAddCourse = () => {
    console.log(this.state['List of Doctors'])
    let Data = {};
    let Error = {};
    Object.keys(this.Fields).forEach((value) => {
      Data[value] = "";
      Error[value] = false;
      if (this.Fields[value] === "number") {
        Data[value] = 0;
      } else if (this.Fields[value] === "select") {
        Data[value] = [];
      }
    });
    this.setState({
      //reset: null,
      Data: Data,
      Error: Error,
      Fields: this.Fields,
      'List of Doctors': [...this.state['List of Doctors']]
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

  onAddCourse = () => {
    console.log(this.errorHandler(), this.state);
    if (this.errorHandler()) {
      let Course = setNewCourse(this.state.Data);
      console.log("Adding Course");
      AddCourse(Course).then((res) => {
        if (res) {
          alert("Adding Course Succesful");
          this.initAddCourse();
        } else {
          alert("Adding Course failed");
        }
      });
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

  onSelect = (Item, Name) => {
    const d = [...this.state.Data[Name], Item];
    this.setState((prev) => ({
      Error: { ...prev.Error, [Name]: d.length === 0 },
      Data: {
        ...prev.Data,
        [Name]: d,
      },
    }));
  };

  onRemove = (Item, Name) => {
    const d = [...this.state.Data[Name]];
    const pos = d.findIndex((value) => value.value === Item.value);
    d.splice(pos, 1);
    this.setState((prev) => ({
      Error: { ...prev.Error, [Name]: d.length === 0 },
      Data: {
        ...prev.Data,
        [Name]: d,
      },
    }));
  };

  onClear=(Name)=>{
    const d=[]
    this.setState((prev) => ({
      Error: { ...prev.Error, [Name]: d.length === 0 },
      Data: {
        ...prev.Data,
        [Name]: d,
      },
    }));
  }

  render() {
    const AddCourseField = (
      <React.Fragment>
        {Object.keys(this.state.Fields).map((value, index) => {
          return (
            <NormalTextField
              multiple
              key={index}
              DataList={this.state[value]}
              value={this.state.Data[value]}
              type={this.state.Fields[value]}
              Name={value}
              onChange={this.changeInput}
              Error={this.state.Error[value]}
              onSelect={(List, Item, Name) => this.onSelect(Item, Name)}
              onRemove={(List, Item, Name) => this.onRemove(Item, Name)}
              onClear={(Name)=>this.onClear(Name)}
            />
          );
        })}
      </React.Fragment>
    );
    return (
      <Card row shadow>
        <div className={classes.Login}>
          <h1 className={classes.MainTitle}>Add New Course</h1>
          <div className={classes.Field}>{AddCourseField}</div>
          <div className={classes.ButtonArea}>
            <Button onClick={this.onAddCourse}>Add Course</Button>
          </div>
        </div>
        <div className={classes.Blue}>
          <ImageHolder filler={image} />
        </div>
      </Card>
    );
  }
}

export default AddCoursePage;
