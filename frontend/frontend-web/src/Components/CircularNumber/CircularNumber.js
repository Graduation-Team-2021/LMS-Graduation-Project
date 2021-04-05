import classes from "./CircularNumber.module.css";
import React from "react";

const CircularNumber = (props) => {
  return (
    <div className={classes.Main}>
      <div
        style={{
          color: "white",
          fontSize: "1.2vw",
        }}
      >
        {props.filler}
      </div>
    </div>
  );
};

export default CircularNumber;
