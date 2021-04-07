import classes from "./OldCourses.module.css";
import React, { Component } from "react";
import OldCourse from "../../Components/OldCourse/OldCourse";
import Dismiss from "../../Components/DismissComponent/Dismiss";

class OldCourses extends Component {
  state = { Courses: this.props.Courses, dismissed: false };

  onDismiss = () =>
    this.setState((old, props) => {
      let temp = [...old.Courses];
      temp.pop();
      return {
        Courses: temp,
      };
    });

  render() {
    const Courses = this.state.Courses.map((value, index) => (
      <OldCourse key={index} {...value} />
    ));

    return (
      <div className={classes.Main}>
        <div className={classes.Title}>{this.props.Title}</div>
        <div className={classes.holder}>
          <Dismiss
            Title="Finished Courses"
            onDismiss={this.onDismiss}
            ref={this.myRef}
          >
            {Courses}
          </Dismiss>
        </div>
      </div>
    );
  }
}

export default OldCourses;
