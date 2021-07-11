import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      className={classes.Button +" " +(props.type!=="cancel"?classes.Default: classes.Cancel)+ " " + props.className}
      onClick={props.onClick}
    >
    {props.children}
    </button>
  );
};

export default Button;
