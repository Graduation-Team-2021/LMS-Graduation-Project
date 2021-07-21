import classes from "./Thumbnails.module.css";
import React from "react";
import Thumbnail from "./Thumbnail/Thumbnail";

const Thumbnails = (props) => {
  console.log(props.files);
  return (
    <div className={classes.holder}>
      {props.files.map((val, index) => (
        <Thumbnail
            file={val}
          key={index}
          remove={() => props.remove(index)}
          type={val.type}
          name={val.name}
        />
      ))}
    </div>
  );
};

export default Thumbnails;
