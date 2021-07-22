import classes from "./Thumbnail.module.css";
import React from "react";
import ImageHolder from "../../../../ImageHolder/ImageHolder";
import PDF from "../../../../../assets/PDF.png";
import ZIP from "../../../../../assets/ZIP.png";
import Video from "../../../../../assets/Video.jpg";

const type = {
  "application/zip": ZIP,
  "application/pdf": PDF,
  "application/vnd.rar": ZIP,
};

const Thumbnail = (props) => {
  var src;
  //TODO: use assoiciated file type
  if (props.type) {
    if (Object.keys(type).includes(props.type)) {
      src = type[props.type];
    } else if (props.type.includes("video")) {
      src = Video;
    } else if (props.type.includes("image")) {
      src = URL.createObjectURL(props.file);
    }
  }else{
      src=null
  }

  return (
    <div className={classes.Thumb + (props.delivers_id?(" "+classes.border):"")} onClick={props.remove}>
      <ImageHolder className={classes.Image} filler={src} />
      <div className={classes.Title}>{props.name||"No Name"}</div>
    </div>
  );
};

export default Thumbnail;
