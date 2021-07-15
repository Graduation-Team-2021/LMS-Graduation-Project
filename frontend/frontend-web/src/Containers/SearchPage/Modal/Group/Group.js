import React from "react";
import classes from "./Group.module.css";
import ImageHolder from "../../../../Components/ImageHolder/ImageHolder";
import Button from "../../../../Components/Button/Button";

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
      <span className={classes.Button}>
        <Button
          className={classes.Inner}
          onClick={() => {
            props.dismiss();
            console.log("opening group page");
          }}
        >
          Go to Page
        </Button>
      </span>
    </div>
  );
};

export default Group;
