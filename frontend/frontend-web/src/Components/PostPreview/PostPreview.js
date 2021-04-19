import React from "react";
import classes from "./PostPreview.module.css";
import filler from "../../assets/Filler.png";
import ImageHolder from "../ImageHolder/ImageHolder";
import Card from '../Card/Card'

const PostPreview = (props) => {
  return (
    <span className={classes.Main}>
      <Card className={classes.Card}>
        <div onClick={props.show}>
          <div
            style={{
              margin: "1vh 1vw",
            }}
          >
            <ImageHolder filler={filler} />
          </div>
          <div className={classes.Bottom}>
            <div className={classes.CourseTitle}>{props.Post.Title}</div>
            <div className={classes.CourseDes}>{props.Post.Desc}</div>
          </div>
        </div>
      </Card>
    </span>
  );
};

export default PostPreview;
