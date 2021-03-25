import React from "react";

import classes from './CourseItemCotent.module.css'

const courseItemContent = (props) => {
  return (
    <div className={classes.CourseItemContentContainer}>
        <h5 className={classes.CourseName} >{props.CourseName}</h5>
        <subtitle className={classes.DoctorName} >{props.DoctorName}</subtitle>
    </div>
  );
};

export default courseItemContent;
