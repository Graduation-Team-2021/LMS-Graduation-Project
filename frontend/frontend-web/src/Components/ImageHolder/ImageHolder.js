import React from "react";
import classes from "./ImageHolder.module.css";

const ImageHolder = (props) => {
  return (
    <div className={classes.handler}>
      <img
        src={props.filler}
        alt=""
        style={{
          objectFit: "fill",
          width: "100%",
          height: "100%",
          alignSelf: "center",
          justifySelf: "center",
        }}
      />
    </div>
  );
};

export default ImageHolder;
