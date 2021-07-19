import classes from "./CoursesPage.module.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../Components/Card/Card";
import CourseListItem from "../../Components/CoursesPageComponents/CourseListItem/CourseListItem";
import CourseOverView from "../../Components/CoursesPageComponents/CourseOverview/CourseOverview";
import Waiting from "../../Components/Waiting/Waiting";

import {
  getCourses,
  getFinishedCourses,
  BE_Enroll,
  getGroups,
} from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setCourse } from "../../Models/Course";

const HomePage = (props) => {
  const [Courses, setCourses] = useState({});
  const [displayedCourse, setdisplayedCourse] = useState(null);
  const { Token, ID, Role } = props.userData;
  const { TokenError } = props.userDataActions;
  const { currentCourses } = props.currentCourses;
  const { finishedCourses } = props.finishedCourses;
  const [loading, setLoading] = useState(true);

  const Enroll = () => {
    //TODO:enroll in Backend
    BE_Enroll(ID, Token, displayedCourse).then((res) => {
      if (res) {
        var temp = { ...Courses };
        temp[displayedCourse].isEnrolled = "true";
        setCourses(temp);
        alert("Enroll Successful");
      } else {
        alert("Enroll Failed, please Try Again");
      }
    });
  };

  const selectingCourseHandler = (courseid) => {
    setdisplayedCourse(courseid);
  };

  const removingFromTheStageHandler = () => {
    setdisplayedCourse(null);
  };

  useEffect(() => {
    getCourses(Token).then((res) => {
      getFinishedCourses(Token, ID, Role).then((r2) => {
        setLoading(false);
        if (res) {
          let Courses = new Map();
          res.forEach((id, index) => {
            id["isenrolled"] = "false";
            if (
              Array.from(currentCourses.keys()).includes(id["course_code"]) ||
              r2.find((value) => value.course_code === id["course_code"])
            ) {
              id["isenrolled"] = "true";
            }
            if (props.location.state) {
              if (id["isenrolled"] === "false") {
                Courses[id["course_code"]] = setCourse(id);
              }
            } else {
              Courses[id["course_code"]] = setCourse(id);
            }
          });
          console.log("====================================");
          console.log(Courses);
          console.log("====================================");
          setCourses(Courses);
        } else {
          TokenError();
        }
      });
    });
  }, [
    ID,
    Role,
    Token,
    TokenError,
    currentCourses,
    finishedCourses,
    props.location.state,
  ]);

  //TODO: Use This, Hazem
  useEffect(() => {
    getGroups().then((res) => {
      //TODO: Fit data to Components
    });
  }, []);

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
