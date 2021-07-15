import React from "react";
import classes from "./User.module.css";
import ImageHolder from "../../../../Components/ImageHolder/ImageHolder";
import {url} from '../../../../Interface/Interface'

const User = (props) => {
  const user = props.Data;
  return (
    <div className={classes.Main}>
      <span className={classes.Image}>
        <ImageHolder filler={user.picture?url+user.picture:null} />
      </span>
      <span className={classes.Details}>
        {/* TODO: Add Current Year, Role */}
        {/* TODO: Add Message Button */}
        <h2>{user.name}</h2>
        <div>{user.birthday}</div>
        <div>{user.email}</div>
      </span>
    </div>
  );
};

export default User;
