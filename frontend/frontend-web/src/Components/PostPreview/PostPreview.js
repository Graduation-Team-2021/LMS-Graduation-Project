import React from "react";
import classes from "./PostPreview.module.css";
import Card from "../Card/Card";
import filler from "../../assets/Filler.png";
import ImageHolder from "../ImageHolder/ImageHolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

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
          <div className={classes.CourseTitle}>{props.Title}</div>
          <div className={classes.CourseDes}>{props.Desc}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GroupPreview;
