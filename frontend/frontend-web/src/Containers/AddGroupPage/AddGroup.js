import React, { Component } from "react";
import validator from "validator";
import { connect } from "react-redux";

import classes from "./AddGroup.module.css";
import image from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import NormalTextField from "../../Components/NormalTextField/NormalTextField";
import Button from "../../Components/Button/Button";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import {
  AddGroup,
  getCourses,
  getStudentsByCourse,
} from "../../Interface/Interface";
import { setNewGroup } from "../../Models/Group";
import { setCourse } from "../../Models/Course";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";


class AddGroupPage extends Component {
  Fields = {
    "Group Name": "text",
    "Group Description": "text",
    "Related Course": "select",
  };

  constructor(props) {
    super(props);
    let Data = {};
    let Error = {};
    let Lists = {};
    Object.keys(this.Fields).forEach((value) => {
      Data[value] = "";
      Error[value] = false;
      if (this.Fields[value]==='number') {
        Data[value] = 0;
      } else if (this.Fields[value] === "select") {
        Data[value] = [];
        Lists[value] = []
      }
    });
    this.state = {
      Fields: this.Fields,
      Data: Data,
      Error: Error,
      ...Lists
    };
  }

  componentDidMount() {
    getCourses().then((res) => {
      let temp = [];
      res.forEach((value) => {
        let t2 = setCourse(value);
        temp.push({
          value: t2.CourseID,
          name: t2.CourseName,
        });
      });
      this.setState({
        Courses: temp,
      });
    });
  }

  onSelect = (List, Option, Name) => {
    if (Name === "Related Course") this.onCourseChange(Option.value);
    this.setState((old, props) => {
      const state = { ...old };
      state.Error[Name] = false;
      state.Data[Name] = List;
      return state;
    });
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

  onRemove = (List, Option, Name) => {
    this.setState((old, props) => {
      const state = { ...old };
      state.Error[Name] = List.length===0;
      state.Data[Name] = List;
      return state;
    });
  };

  onCourseChange = (id) => {
    getStudentsByCourse(id).then((res) => {
      let temp = [];
      res.forEach((data) =>
        temp.push({
          value: data["id"],
          name: data["name"],
        })
      );
      this.setState((old, props) => {
        let t2 = { ...old.Data, "List of Students": [] };
        let t3 = { ...old.Error, "List of Students": false };
        let t4 = { ...old.Fields, "List of Students": "select" };
        let New = { ...old };
        New.Data = t2;
        New.Error = t3;
        New["Students"] = temp;
        New.Fields = t4;
        return New;
      });
    });
  };

  initAddGroup = () => {
    let Data = {};
    let Error = {};
    let Lists = {};
    Object.keys(this.Fields).forEach((value) => {
      Data[value] = "";
      Error[value] = false;
      if (this.Fields[value]==='number') {
        Data[value] = 0;
      } else if (this.Fields[value] === "select") {
        Data[value] = [];
        Lists[value] = []
      }
    });
    this.setState({
      Fields: this.Fields,
      Data: Data,
      Error: Error,
      ...Lists
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

  onAddGroup = async () => {
    if (this.errorHandler()) {
      let Group = setNewGroup(this.state.Data);
      let res = await AddGroup(Group, this.props.userData.Token);
      if (res) {
        alert("Adding Group Succesful");
        this.initAddGroup();
      } else {
        alert("Adding Group failed");
      }
      this.initAddGroup();
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
        {Object.keys(this.state.Fields).map((value, index) => {
          return (
            <NormalTextField
              key={index}
              value={this.state.Data[value]}
              type={this.state.Fields[value]}
              Name={value}
              onChange={this.changeInput}
              onSelect={this.onSelect}
              onRemove={this.onRemove}
              Error={this.state.Error[value]}
              multiple={value === "List of Students"}
              onClear={(Name)=>this.onClear(Name)}
              DataList={
                value === "List of Students"
                  ? this.state.Students
                  : value === "Related Course"
                  ? this.state.Courses
                  : null
              }
            />
          );
        })}
      </React.Fragment>
    );
    return (
        <Card row shadow>
          <div className={classes.Login}>
            <h1 className={classes.MainTitle}>Add New Group</h1>
            <div className={classes.Field}>{AddCourseField}</div>
            <div className={classes.ButtonArea}>
              <Button onClick={this.onAddGroup} >Add Group</Button>
            </div>
          </div>
          <div className={classes.Blue}>
            <ImageHolder filler={image} />
          </div>
        </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupPage);
