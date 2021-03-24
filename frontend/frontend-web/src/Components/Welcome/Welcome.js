import React from "react";
import classes from './Welcome.module.css'

const Welcome = (props) => {
  return (
    <div className={classes.Main}>
      <div className={classes.Title}>Hello, {props.Name}</div>
      <div>"With great power, comes great responsibility"</div>
    </div>
  );
};

export default Welcome;
