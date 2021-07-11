import classes from "./CoursesPage.module.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../Components/Card/Card";
import CourseListItem from "../../Components/CoursesPageComponents/CourseListItem/CourseListItem";
import CourseOverView from "../../Components/CoursesPageComponents/CourseOverview/CourseOverview";
import Waiting from "../../Components/Waiting/Waiting";

import { getCourses } from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setCourse } from "../../Models/Course";

const HomePage = (props) => {
  const [Courses, setCourses] = useState(new Map());
  const [displayedCourse, setdisplayedCourse] = useState(null);
  const { Token } = props.userData;
  const { TokenError } = props.userDataActions;
  const { currentCourses } = props.currentCourses;
  const { finishedCourses } = props.finishedCourses;
  const [loading, setLoading] = useState(true);

  const selectingCourseHandler = (courseid) => {
    setdisplayedCourse(courseid);
  };

  const removingFromTheStageHandler = () => {
    setdisplayedCourse(null);
  };

  useEffect(() => {
    getCourses(Token).then((res) => {
      setLoading(false);
      if (res) {
        let Courses = new Map();
        res.forEach((id, index) => {
          id["pic"] =
            index % 3 === 0
              ? "https://miro.medium.com/max/2560/1*tYxWuyksovxA1Thu8PggPQ.jpeg"
              : index % 3 === 1
              ? "https://cdn.britannica.com/w:1100/50/190450-131-527BAEF7/series-Elementary-Particles-subject-forms-nuclear-physics.jpg"
              : "https://i.pinimg.com/736x/c8/e5/75/c8e5753370bad54c7977d485e0a0e29d.jpg";
          id["isenrolled"] = "false";
          if (Array.from(currentCourses.keys()).includes(id["course_code"])) {
            id["isenrolled"] = "true";
          }
          Courses.set(id["course_code"], setCourse(id));
        });
        setCourses(Courses);
      } else {
        TokenError();
      }
    });
  }, [Token, TokenError, currentCourses, finishedCourses]);

  let loadedCourses = [];
  Array.from(Courses.keys()).forEach((key) => {
    loadedCourses.push(
      <CourseListItem
        {...Courses.get(key)}
        key={key}
        id={key}
        getSelected={selectingCourseHandler}
        displayedCourse={displayedCourse}
      />
    );
  });

  let stage = (
    <div className={classes.CourseOverview}>
      <CourseOverView
        Course={Courses.get(displayedCourse)}
        {...Courses.get(displayedCourse)}
        removeHandler={removingFromTheStageHandler}
      />
    </div>
  );
  if (displayedCourse === null) {
    stage = null;
  }

  return (
    <div className={classes.Center}>
      <Card shadow className={classes.Card}>
        <Waiting Loading={loading}>
          <div className={classes.CoursesPage}>
            <div className={classes.CoursesList}>{loadedCourses}</div>
            {stage}
          </div>
        </Waiting>
      </Card>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
