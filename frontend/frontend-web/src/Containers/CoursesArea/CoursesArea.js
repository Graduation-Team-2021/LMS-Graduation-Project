import classes from "./CoursesArea.module.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CoursePreview from "../../Components/CoursePreview/CoursePreview";
import SwipeList from "../../Components/SwipeList/SwipeList";
import Waiting from "../../Components/Waiting/Waiting";

import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setCourse } from "../../Models/Course";
import { getCurrentCourses } from "../../Interface/Interface";

class CoursesArea extends Component {
  state = {
    Courses: [],
    Loading: true,
    flag: true,
  };

  Token = this.props.userData.Token;
  CurrentCourses = this.props.currentCourses.currentCourses;
  setCurrentCourses = this.props.currentCoursesActions.onSetCurrentCourses;
  TokenError = this.props.userDataActions.tokenError;

  componentDidMount() {
    /* if (this.state.flag) {
      s2.cancel("Cancelling Current Groups");
      s2 = null;
    } */
    getCurrentCourses(this.Token).then((res) => {
      const Courses = new Map();
      if (res) {
        res.forEach((element) => {
          Courses.set(element["course_code"], setCourse(element));
        });
        this.setState({
          FirstTime: false,
          Courses: Courses,
        });
        this.setCurrentCourses(Courses);
      } else {
        this.TokenError();
      }
      this.setState({
        Loading: false,
      });
    });
  }

  loadCourses = () => {
    this.props.history.push("/Courses");
  };

  loadDeliverables = () => {
    //TODO: use this for routing
    this.props.history.push({
      pathname: `/Deliv`,
    });
  };

  render() {
    let courses = [];
    let ids = Array.from(this.state.Courses.keys());

    for (let index = 0; index < ids.length; index++) {
      courses.push(
        <CoursePreview
          key={index}
          Course={this.state.Courses.get(ids[index])}
          id={ids[index]}
        />
      );
    }

    return (
      <div className={classes.CoursesArea}>
        <div className={classes.Title}>
          Courses You're Taking
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <button
              className={classes.Join}
              onClick={() => {
                this.loadDeliverables();
              }}
            >
              Check Deliverables
            </button>
            <button
              className={classes.Join}
              onClick={() => {
                this.loadCourses();
              }}
            >
              See All Courses
            </button>
          </div>
        </div>
        <Waiting Loading={this.state.Loading}>
          <SwipeList>{courses}</SwipeList>
        </Waiting>
        <div style={{
           display: "flex"
        }}>
        <button
              className={classes.Join2}
              onClick={() => {
                this.loadDeliverables();
              }}
            >
              Check Deliverables
            </button>
        <button
          className={classes.Join2}
          onClick={() => {
            this.loadCourses();
          }}
        >
          See All Courses
        </button>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CoursesArea)
);
