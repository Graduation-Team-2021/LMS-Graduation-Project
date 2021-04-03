import React from "react";
import classes from "./ImageHolder.module.css";

const ImageHolder = (props) => {
  return (
    <div className={classes.handler}>
      <img
        src={props.filler}
        alt=""
        className={classes.img}
      />
    </div>
  );
};

export default ImageHolder;
