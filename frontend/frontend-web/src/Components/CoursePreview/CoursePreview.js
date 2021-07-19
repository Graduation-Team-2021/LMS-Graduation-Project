import React from "react";
import Card from "../Card/Card";
import filler from "../../assets/Filler.png";
import classes from "./CoursePreview.module.css";
import ImageHolder from "../ImageHolder/ImageHolder";
import { withRouter } from "react-router-dom";

const CoursePreview = (props) => {
  return (
    <div
      className={classes.holder}
      onClick={() => {
        console.log(props.Course);
        props.history.push({
          pathname: `/Course/${props.id}`,
          state: {
            Data: props.Course,
            isJoined: "true",
          },
        });
      }}
    >
      <Card className={classes.Card} shadow>
        <div className={classes.CourseTitle}>{props.Course.CourseName}</div>
        <ImageHolder filler={props.Course.CoursePic||filler} />
      </Card>
    </div>
  );
};

export default withRouter(CoursePreview);
