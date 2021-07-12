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

  const [Courses, setCourses] = useState({});
  const [displayedCourse, setdisplayedCourse] = useState(null);
  const { Token } = props.userData;
  const { TokenError } = props.userDataActions;
  const { currentCourses } = props.currentCourses;
  const { finishedCourses } = props.finishedCourses;
  const [loading, setLoading] = useState(true);

  const Enroll = () => {
    //TODO:enroll in Backend
    var temp = { ...Courses };
    temp[displayedCourse].isEnrolled = "true";
    setCourses(temp);
    alert("Enroll Successful");
  };

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
          id["pic"] ='https://picsum.photos/200/300'
            
          id["isenrolled"] = "false";
          if (Array.from(currentCourses.keys()).includes(id["course_code"])) {
            id["isenrolled"] = "true";
          }
          if (props.location.state) {
            if (id["isenrolled"]=="false") {
              Courses[id["course_code"]] = setCourse(id);
            }
          } else {
            Courses[id["course_code"]] = setCourse(id);
          }
        });
        console.log('====================================');
        console.log(Courses);
        console.log('====================================');
        setCourses(Courses);
      } else {
        TokenError();
      }
    });
  }, [Token, TokenError, currentCourses, finishedCourses]);

  let loadedCourses = [];
  Array.from(Object.keys(Courses)).forEach((key) => {
    loadedCourses.push(
      <CourseListItem
        {...Courses[key]}
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
        Course={Courses[displayedCourse]}
        {...Courses[displayedCourse]}
        removeHandler={removingFromTheStageHandler}
        Enroll={Enroll}
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
