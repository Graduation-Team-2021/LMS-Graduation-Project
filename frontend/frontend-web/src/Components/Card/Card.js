import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  let className = [classes.Main];

  if (props.className) {
    className.push(props.className);
  }

  if (props.row) {
    className.push(classes.Row);
  } else {
    className.push(classes.Column);
  }

  if (props.shadow) {
    className.push(classes.shadow);
  }


  return (
    <div
      className={className.join(" ")}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;
