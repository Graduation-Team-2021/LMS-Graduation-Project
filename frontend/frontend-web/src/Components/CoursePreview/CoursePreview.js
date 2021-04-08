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
            postID: props.Course.Post,
            isJoined: "true",
            name: props.Course.Title,
            Desc: props.Course.Desc
          },
        });
      }}
    >
      <Card className={classes.Card} shadow>
        <div className={classes.CourseTitle}>{props.Course.Title}</div>
        <ImageHolder filler={filler} />
      </Card>
    </div>
  );
};

export default withRouter(CoursePreview);
