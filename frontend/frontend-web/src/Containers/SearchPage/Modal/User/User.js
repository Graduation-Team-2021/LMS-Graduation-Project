import React from "react";
import classes from "./User.module.css";
import ImageHolder from "../../../../Components/ImageHolder/ImageHolder";
import { url } from "../../../../Interface/Interface";
import Button from "../../../../Components/Button/Button";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../../../store/reduxMaps";
import { connect } from "react-redux";

const User = (props) => {
  const user = props.Data;
  return (
    <div className={classes.Main}>
      <span className={classes.Image}>
        <ImageHolder filler={user.picture ? url + user.picture : null} />
      </span>
      <span className={classes.Details}>
        <h2>{user.name}</h2>
        <div>{user.Role}</div>
        <div>Birthday: {user.birthday}</div>
        <div>{user.email}</div>
      </span>
      <span className={classes.Button}>
        <Button
          className={classes.Inner}
          onClick={() => {
            props.currentMessageActions.onSetCurrentMessage({
              ID: user.user_id,
              Name: user.name,
            });
            props.dismiss();
            console.log("opening messenger");
          }}
        >
          Message
        </Button>
      </span>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
