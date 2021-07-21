import React from "react";
import classes from "./GroupPreview.module.css";
import Card from "../Card/Card";
import CircularNumber from "../CircularNumber/CircularAvatar";
import CircularAvatar from "../CircularAvatar/CircularAvatar";
import filler from "../../assets/Filler.png";
import ImageHolder from "../ImageHolder/ImageHolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import {withRouter} from "react-router-dom";
const GroupPreview = (props) => {
  let Joined = [];

  const Number = 108;

  if (Number > 4) {
    Joined.push(
      <div
        key={0}
        className={classes.Circle}
        style={{
          zIndex: Number,
        }}
      >
        <CircularNumber filler={"+" + (Number - 3 <= 999 ? Number - 3 : 999)} />
      </div>
    );
  }

  for (let index = 0; index < (Number <= 4 ? Number : 3); index++) {
    Joined.push(
      <div
        key={index + 1}
        className={classes.Circle}
        style={{
          zIndex: Number - index - (Number > 4 ? 1 : 0),
          transform:
            "translateX(" + (-index - (Number > 4 ? 1 : 0)) * 30 + "px)",
        }}
      >
        <CircularAvatar filler={filler} />
      </div>
    );
  }

  return (
    <Card
      style={{
        padding: "0",
        height: "100%",
        border: "2px solid purple",
        overflow: "hidden",
        zIndex: "10",
        position: 'relative',
      }}
    >
      <div
      onClick={
        ()=>props.history.push(`/group/${props.id}/false`)
      }
        style={{
          margin: "5% 5%",
        }}
      >
        <div className={classes.CourseTitle}>{props.Title}</div>
        <div className={classes.CourseDes}>{props.Desc}</div>
        <ImageHolder filler={filler} />
      </div>
      <div className={classes.Bottom}>
        <div className={classes.Joined}>{Joined}</div>
      </div>
      <div onClick={props.dismiss} className={classes.dismiss}>
        <FontAwesomeIcon icon={faTimesCircle} size="4x" />
      </div>
    </Card>
  );
};

export default withRouter(GroupPreview);
