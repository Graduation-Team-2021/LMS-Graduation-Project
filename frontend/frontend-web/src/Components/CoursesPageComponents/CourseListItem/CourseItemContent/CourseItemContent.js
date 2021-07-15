import React from "react";

import classes from './CourseItemCotent.module.css'

const courseItemContent = (props) => {
  return (
    <div className={classes.CourseItemContentContainer}>
        <h5 className={classes.CourseName} >{props.CourseName}</h5>
        <div className={classes.DoctorName} >{props.DoctorName.length!==0?props.DoctorName.join(', '):"No Instructors Yet"}</div>
    </div>
  );
};

export default courseItemContent;
