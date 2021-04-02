import React from "react";
import classes from "./PostPreview.module.css";
import filler from "../../assets/Filler.png";
import ImageHolder from "../ImageHolder/ImageHolder";


const GroupPreview = (props) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default GroupPreview;
