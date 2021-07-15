import React from "react";
import classes from "./ImageHolder.module.css";
import filler from '../../assets/Filler.png'

const ImageHolder = (props) => {

  const className = [classes.handler]

  if (props.className) {
    className.push(props.className)
  }

  return (
    <div className={className.join(" ")}>
      <img
        src={props.filler||filler}
        alt=""
        className={classes.img}
      />
    </div>
  );
};

export default ImageHolder;
