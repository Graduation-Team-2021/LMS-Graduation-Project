import React from "react";
import classes from "./Group.module.css";
import ImageHolder from "../../../../Components/ImageHolder/ImageHolder";

const Group = (props) => {
  const user = props.Data;
  console.log(user);
  return (
    <div className={classes.Main}>
      <span className={classes.Image}>
        <ImageHolder />
      </span>
      <span className={classes.Details}>
        {/* TODO: Add Status */}
        {/* TODO: Add Join/Goto Button */}
        <h2>{user.group_name}</h2>
        <div>{user.group_description || "No Description"}</div>
      </span>
    </div>
  );
};

export default Group;
