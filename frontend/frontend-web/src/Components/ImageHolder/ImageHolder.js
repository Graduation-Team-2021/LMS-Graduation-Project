import React from "react";
import classes from "./ImageHolder.module.css";

const ImageHolder = (props) => {

  const className = [classes.handler]

  if (props.className) {
    className.push(props.className)
  }

  return (
    <div className={className.join(" ")}>
      <img
        src={props.filler}
        alt=""
        className={classes.img}
      />
    </div>
  );
};

export default ImageHolder;
