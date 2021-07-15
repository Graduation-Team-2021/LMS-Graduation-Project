import React from "react";
import classes from "./Course.module.css";
import ImageHolder from "../../../../Components/ImageHolder/ImageHolder";
import Button from "../../../../Components/Button/Button";
import { withRouter } from "react-router";
import { setCourse } from "../../../../Models/Course";

const Course = (props) => {
  const user = props.Data;
  return (
    <div className={classes.Main}>
      <span className={classes.Image}>
        <ImageHolder />
      </span>
      {/* TODO: Add Taught By, Status */}
      {/* TODO: Add Enroll/Goto Button */}
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
            props.dismiss();
            if (user.status === "Enrolled") {
              console.log("opening Course page");
              props.history.push({
                pathname: `/Course/${user.course_code}`,
                state:{
                  isJoined: "true",
                  Data: setCourse(user)
                }
              });
            } else {
              /* TODO: Enroll Function */
              console.log("opening Enroll Modal");
            }
          }}
        >
          {user.status === "Enrolled" ? "Go to Page" : "Enroll"}
        </Button>
      </span>
    </div>
  );
};

export default withRouter(Course);
