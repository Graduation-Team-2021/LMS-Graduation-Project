import classes from "./CoursesArea.module.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CoursePreview from "../../Components/CoursePreview/CoursePreview";
import SwipeList from "../../Components/SwipeList/SwipeList";

import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

class CoursesArea extends Component {
  state = {
    Courses: this.props.Courses,
  };

  loadCourses = () => {
    this.props.history.push("/Courses");
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
          <button
            className={classes.Join}
            onClick={() => {
              this.loadCourses();
            }}
          >
            See All Courses
          </button>
        </div>
        <SwipeList>{courses}</SwipeList>
        <button
          className={classes.Join2}
          onClick={() => {
            this.loadCourses();
          }}
        >
          See All Courses
        </button>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CoursesArea)
);
