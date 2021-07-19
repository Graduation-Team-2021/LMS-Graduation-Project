import React from "react";
import classes from "./OldCourse.module.css";
import Card from "../Card/Card";
import filler from "../../assets/Filler.png";
import ImageHolder from "../ImageHolder/ImageHolder";

const OldCourse = (props) => {
  return (
    <span className={classes.Main}>
      <Card className={classes.Card}>
        <div className={classes.Top}>
          <div className={classes.CourseTitle}>{props.Title}</div>
          <ImageHolder className={classes.Image} filler={props.pic||filler} />
        </div>
        <div className={classes.Bottom}>Final Grade: {props.grade}</div>
      </Card>
    </span>
  );
};

export default OldCourse;
