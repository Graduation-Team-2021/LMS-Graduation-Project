import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      className={
        classes.Button +
        " " +
        (props.type === "cancel"
          ? classes.Cancel
          : props.type === "correct"
          ? classes.green
          : classes.Default) +
        " " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
