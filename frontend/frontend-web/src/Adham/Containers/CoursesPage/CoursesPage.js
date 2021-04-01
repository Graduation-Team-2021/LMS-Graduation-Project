import React, { Component } from "react";

import CourseListItem from "../../Components/CoursesPageComponents/CourseListItem/CourseListItem";
import CourseOverView from "../../Components/CoursesPageComponents/CourseOverview/CourseOverview";

import classes from "./CoursesPage.module.css";

class CoursesPags extends Component {
  
  constructor(props) {
    super(props);
    let ids = this.props.Courses
    let Courses = new Map()
    ids.forEach(
      (id, index) => {
        Courses.set(id['course_code'], { 
          CourseID: id['course_code'],
          CourseName: id['course_name'], 
          DoctorName: id['course_teacher'], 
          CourseDescription: id['course_description'],
          PostID: id['post_owner_id'],
          CoursePicture: index % 3 === 0 ? "https://miro.medium.com/max/2560/1*tYxWuyksovxA1Thu8PggPQ.jpeg" : index % 3 === 1 ? "https://cdn.britannica.com/w:1100/50/190450-131-527BAEF7/series-Elementary-Particles-subject-forms-nuclear-physics.jpg" : "https://i.pinimg.com/736x/c8/e5/75/c8e5753370bad54c7977d485e0a0e29d.jpg", })
      }
    )
    this.state={
      loadedCourses: Courses,
      displayedCourse: null,
    };
  }

  selectingCourseHandler = (courseid) => {
    this.setState({ displayedCourse: courseid });
  };
  removingFromTheStageHandler = () => {
    this.setState({
      displayedCourse: null
    })
  }

  render() {
    
    let loadedCourses = []
     Array.from(this.state.loadedCourses.keys()).forEach((key) => {
      loadedCourses.push (
        <CourseListItem
          {...this.state.loadedCourses.get(key)}
          key={key}
          id={key}
          getSelected={this.selectingCourseHandler}
          displayedCourse={this.state.displayedCourse}
        />
      );
    });

    let stage = (
      <div className={classes.CourseOverview}>
        <CourseOverView
          {...this.state.loadedCourses.get(this.state.displayedCourse)}
          removeHandler={this.removingFromTheStageHandler}
        />
      </div>
    );
    if (this.state.displayedCourse === null) {
      stage = null;
    }


    return (
      <div className={classes.CoursesPage}>
        <div className={classes.CoursesList}>{loadedCourses}</div>
        {stage}
      </div>
    );
  }
}

export default CoursesPags;
