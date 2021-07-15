import React from "react";
import classes from "./Course.module.css";
import ImageHolder from "../../../../Components/ImageHolder/ImageHolder";

const Course = (props) => {
    const user = props.Data;
    return (
      <div className={classes.Main}>
        <span className={classes.Image}>
          <ImageHolder />
        </span>
        {/* TODO: Add Taught By, Status */}
        {/* TODO: Add Enroll/Goto Button */}
        <span className={classes.Details}>
          <h2>{user.course_code} - {user.course_name}</h2>
          <div>{user.course_description||"No Description"}</div>
          <div>Weekly Hours:{user.weekly_hours}</div>
        </span>
      </div>
    );
};

export default Course;
