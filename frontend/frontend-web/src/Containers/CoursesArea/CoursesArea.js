import classes from "./CoursesArea.module.css";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CoursePreview from "../../Components/CoursePreview/CoursePreview";

import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

class CoursesArea extends Component {
  state = {
    Courses: this.props.Courses,
    overflowActive: false,
  };

  constructor(props) {
    super(props);
    this.CoursesArea = React.createRef();
  }

  loadCourses = () => {
    this.props.history.push("/Courses");
  };

  isEllipsisActive(e) {
    //This is for checking the overflow
    return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
  }

  componentDidMount() {
    this.setState({
      overflowActive: this.isEllipsisActive(this.CoursesArea.current),
    });
  }

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
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div className={classes.Title}>Courses You're Taking</div>
          <button
            className={classes.Join}
            onClick={() => {
              this.loadCourses();
            }}
          >
            See All Courses
          </button>
        </div>
        <div className={classes.SwipeList}>
          {this.state.overflowActive ? (
            <div
              className={classes.Right}
              onClick={() => {
                this.CoursesArea.current.scrollLeft -= 250;
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="4x" />
            </div>
          ) : null}
          <div
            className={
              classes.InnerSwipeList +
              (!this.state.overflowActive ? "" : " " + classes.overFlow)
            }
            ref={this.CoursesArea}
          >
            {courses}
          </div>
          {this.state.overflowActive ? (
            <div
              className={classes.Left}
              onClick={() => {
                this.CoursesArea.current.scrollLeft += 250;
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} size="4x" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CoursesArea));
