import classes from "./CircularAvatar.module.css";
import React from "react";

const CircularAvatar = (props) => {
  return (
    <div className={classes.Main} style={props.style}>
      <img
        src={props.filler}
        alt=""
        style={{
          objectFit: "cover",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      />
    </div>
  );
};

export default CircularAvatar;
