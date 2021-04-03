import classes from "./CoursesPage.module.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../Components/Card/Card";
import CourseListItem from "../../Components/CoursesPageComponents/CourseListItem/CourseListItem";
import CourseOverView from "../../Components/CoursesPageComponents/CourseOverview/CourseOverview";

import { getCourses } from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

const HomePage = (props) => {
  const [Courses, setCourses] = useState(new Map());
  const [displayedCourse, setdisplayedCourse] = useState(null);
  const { Token } = props;
  const { TokenError } = props.userDataActions;

  const selectingCourseHandler = (courseid) => {
    setdisplayedCourse(courseid);
  };

  const removingFromTheStageHandler = () => {
    setdisplayedCourse(null);
  };

  useEffect(() => {
    getCourses(Token).then((res) => {
      if (res) {
        let Courses = new Map();
        res.forEach((id, index) => {
          Courses.set(id["course_code"], {
            CourseID: id["course_code"],
            CourseName: id["course_name"],
            DoctorName: id["course_teacher"],
            CourseDescription: id["course_description"],
            PostID: id["post_owner_id"],
            CoursePicture:
              index % 3 === 0
                ? "https://miro.medium.com/max/2560/1*tYxWuyksovxA1Thu8PggPQ.jpeg"
                : index % 3 === 1
                ? "https://cdn.britannica.com/w:1100/50/190450-131-527BAEF7/series-Elementary-Particles-subject-forms-nuclear-physics.jpg"
                : "https://i.pinimg.com/736x/c8/e5/75/c8e5753370bad54c7977d485e0a0e29d.jpg",
          });
        });
        setCourses(Courses);
        console.log(Courses);
      } else {
        TokenError();
      }
    });
  }, [Token, TokenError]);

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
      <div
        style={{
          width: "100%",
        }}
      >
        <Card
          style={{
            alignItems: "flex-start",
            flex: "3",
            height: "fit-content",
          }}
        >
          {Courses.size !== 0 ? (
            <div className={classes.CoursesPage}>
              <div className={classes.CoursesList}>{loadedCourses}</div>
              {stage}
            </div>
          ) : (
            <h1>Loading.....</h1>
          )}
        </Card>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
