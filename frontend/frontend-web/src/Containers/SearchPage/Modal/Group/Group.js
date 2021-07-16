import React from "react";
import classes from "./Group.module.css";
import ImageHolder from "../../../../Components/ImageHolder/ImageHolder";
import Button from "../../../../Components/Button/Button";
import { setGroup } from "../../../../Models/Group";
import {withRouter} from 'react-router-dom'

const Group = (props) => {
  const user = props.Data;
  console.log(user);
  return (
    <div className={classes.Main}>
      <span className={classes.Image}>
        <ImageHolder />
      </span>
      <span className={classes.Details}>
        {/* TODO: Add Join/Goto Button */}
        <h2>{user.group_name}</h2>
        <div>{user.group_description || "No Description"}</div>
      </span>
      <span className={classes.Button}>
        <Button
          className={classes.Inner}
          onClick={() => {
            if (user.status === "Enrolled") {
              props.dismiss();
              console.log("opening group page");
              var Group = setGroup(user)
              props.history.push({
                pathname: `/group/${user.group_id}`,
                state:{
                  isJoined: "true",
                  Data: setGroup(user),
                  postID: Group.Post,
                  name: Group.Title,
                  Desc: Group.Desc
                }
              });
            } else {
              //Enroll in Group
              props.show(true)
            }
          }}
        >
          {user.status === "Enrolled" ? "Go to Page" : "Enroll"}
        </Button>
      </span>
    </div>
  );
};

export default withRouter(Group);
