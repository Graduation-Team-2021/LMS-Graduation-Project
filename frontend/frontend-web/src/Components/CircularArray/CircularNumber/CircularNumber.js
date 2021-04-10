import classes from "./CircularNumber.module.css";
import React from "react";

const CircularNumber = (props) => {
  return (
    <div className={classes.Main}>
      <div
        style={{
          color: "white",
          fontSize: "27px",
        }}
      >
        {props.filler}
      </div>
    </div>
  );
};

export default CircularNumber;
