import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classes from "./CourseOverview.module.css";
import Enroll from "../../../Components/Enroll/Enroll";
import Modal from "../../../Components/Modal/Modal";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../store/reduxMaps";
import ImageHolder from "../../ImageHolder/ImageHolder";

const CourseOverview = (props) => {
  let imageTest = props.CoursePic;

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
        <Enroll
          isEnrolled={props.isEnrolled === "true"}
          id={props.CourseID}
          onCancel={dismiss}
          onAccept={accept}
        />
      </Modal>
      <span className={classes.holder}>
        <ImageHolder
          filler={imageTest}
          alt="tst"
          className={classes.CoursePicture}
        />
      </span>
      <h3>{props.CourseName}</h3>
      <p>{props.CourseDescription}</p>
      <div className={classes.DocPic}>
        {props.DoctorName.length !== 0
          ? props.DoctorName.join(", ")
          : "No Instructors Yet"}
      </div>
      <div className={classes.ButtonsRow}>
        {props.userData.Role === "student" ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.Button}
            onClick={() => {
              if (props.isEnrolled === "true") {
                props.history.push({
                  pathname: `/Course/${props.CourseID}`,
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
              ? `Go to ${props.CourseName}`
              : "Enroll First"}
          </Button>
        ) : null}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseOverview)
);
