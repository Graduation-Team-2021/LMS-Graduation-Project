import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classes from "./CourseOverview.module.css";
import Enroll from "../../Enroll/Enroll";
import Modal from "../../Modal/Modal";

const CourseOverview = (props) => {
  let imageTest = props.CoursePicture;

  const [show, setShow] = useState(false);

  const dismiss = () => {
    setShow(false);
  };

  const accept = () => {
    //enroll in course
    props.Enroll();
    setShow(false);
  };

  return (
    <div className={classes.CourseOverview}>
      <Modal show={show} onClick={dismiss}>
        <Enroll isEnrolled={props.isEnrolled==='true'} id={props.CourseID} onCancel={dismiss} onAccept={accept} />
      </Modal>
      <img src={imageTest} alt="tst" className={classes.CoursePicture} />
      <h3>{props.Title}</h3>
      <p>{props.Desc}</p>
      <div className={classes.ButtonsRow}>
        <Button
          variant="contained"
          color="primary"
          className={classes.Button}
          onClick={() => {
            if (props.isEnrolled === "true") {
              props.history.push({
                pathname: `/Group/${props.CourseID}`,
                state: {
                  Data: props.Course,
                  isJoined: props.isEnrolled,
                },
              });
            } else {
              setShow(true);
            }
          }}
        >
          {props.isEnrolled === "true"
            ? `Go to ${props.Title}`
            : "Enroll First"}
        </Button>
        <Button
          color="secondary"
          className={classes.Button}
          onClick={props.removeHandler}
        >
          remove from the stage
        </Button>
      </div>
    </div>
  );
};

export default withRouter(CourseOverview);
