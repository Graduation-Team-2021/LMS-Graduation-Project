import React from "react";
import {Button} from "@material-ui/core"


import classes from "./CourseOverview.module.css";

const courseOverview = (props) => {
  let imageTest = props.CoursePicture;

  return (
    <div className={classes.CourseOverview}>
      <img src={imageTest} alt="tst" className={classes.CoursePicture} />
      <h3>{props.CourseName}</h3>
      <p>
        {props.CourseDescription}
      </p>
      <div className={classes.DocPic}>
        {props.DoctorName}
      </div>
      <div className ={classes.ButtonsRow} >
        <Button variant="contained" color="primary" className={classes.Button} onClick={()=>{alert(`Go to ${props.CourseName}`)}} >
          Go to {props.CourseName}
        </Button>
        <Button color="secondary" className={classes.Button} onClick={props.removeHandler} >
          remove from the stage
        </Button>
      </div>
    </div>
  );
};

export default courseOverview;
