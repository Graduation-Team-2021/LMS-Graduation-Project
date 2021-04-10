import React from "react";
import Card from "../Card/Card";
import filler from "../../assets/Filler.png";
import classes from "./CoursePreview.module.css";
import ImageHolder from "../ImageHolder/ImageHolder";
import { withRouter } from "react-router-dom";

const GroupPreview = (props) => {
  return (
    <div
      onClick={() =>
        props.history.push({
          pathname: `/group/${props.id}`,
          state: {
            isJoined: 'true',
            postID: props.Group.Post,
            name: props.Group.Title,
            Desc: props.Group.Desc
          }
        })
      }
      className={classes.holder}
    >
      <Card shadow className={classes.Card}>
        <div className={classes.CourseTitle}>{props.Group.Title}</div>
        <ImageHolder filler={filler} />
      </Card>
    </div>
  );
};

export default withRouter(GroupPreview);
