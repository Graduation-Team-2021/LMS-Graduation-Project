import React from "react";
import classes from "./Waiting.module.css";

const Waiting = (props) => {
  let component = (
    <div className={classes.Loading}>
      <div className={classes.loader}/>
    </div>
  );

  if (!props.Loading) {
    component = props.children;
  }

  return component;
};

export default Waiting;
