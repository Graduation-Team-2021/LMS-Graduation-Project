import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={
        classes.Main +
        " " +
        (props.row ? classes.Row : classes.Column) +
        " " +
        (props.shadow ? classes.shadow : "")
      }
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;
