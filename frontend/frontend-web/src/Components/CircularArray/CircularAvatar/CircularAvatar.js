import React from "react";

import classes from "./CircularAvatar.module.css";
import ImageHolder from '../../ImageHolder/ImageHolder'

const CircularAvatar = (props) => {
  return (
    <div className={classes.Main} style={props.style}>
      <ImageHolder filler={props.filler}/>
    </div>
  );
};

export default CircularAvatar;
