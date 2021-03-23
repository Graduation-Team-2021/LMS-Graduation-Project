import React from "react";
import Card from "../Card/Card";
import filler from "../../assets/Filler.png";
import classes from "./CoursePreview.module.css";
import ImageHolder from "../ImageHolder/ImageHolder";
import { withRouter } from "react-router-dom";

const CoursePreview = (props) => {
  return (
    <div
      onClick={() => props.history.push(`/group/${props.id}/true`)}
      className={classes.holder}
    >
      <Card shadow>
        <div className={classes.CourseTitle}>{props.Title}</div>
        <div className={classes.CourseDes}>{props.Desc}</div>
        <ImageHolder filler={filler} />
      </Card>
    </div>
  );
};

export default withRouter(CoursePreview);
