import React from "react";
import classes from "./Course.module.css";
import ImageHolder from "../../../../Components/ImageHolder/ImageHolder";
import Button from "../../../../Components/Button/Button";
import { withRouter } from "react-router";
import { setCourse } from "../../../../Models/Course";
import { mapDispatchToProps, mapStateToProps } from "../../../../store/reduxMaps";
import {connect} from 'react-redux'

const Course = (props) => {
  const user = props.Data;

  return (
    <div className={classes.Main}>
    
      <span className={classes.Image}>
        <ImageHolder />
      </span>
      <span className={classes.Details}>
        <h2>
          {user.course_code} - {user.course_name}
        </h2>
        <div>{user.course_description || "No Description"}</div>
        <div>
          {user.professors.length > 1
            ? user.professors.join(", ")
            : user.professors.length === 1
            ? user.professors[0]
            : "No Professors Yet"}
        </div>
        <div>Weekly Hours:{user.weekly_hours}</div>
      </span>
      <span className={classes.Button}>
        <Button
        className={classes.Inner}
          onClick={() => {
            if (user.status === "Enrolled") {
              props.dismiss();
              props.history.push({
                pathname: `/Course/${user.course_code}`,
                state:{
                  isJoined: "true",
                  Data: setCourse(user)
                }
              });
            } else {
              /* TODO: Enroll Function */
              props.show(true);
            }
          }}
        >
          {user.status === "Enrolled" ? "Go to Page" : "Enroll"}
        </Button>
      </span>
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Course));
