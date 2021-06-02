import React, { useState } from "react";
import { connect } from "react-redux";

import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import Card from "../../Components/Card/Card";
import filler from "../../assets/Filler.png";
import classes from "./AdminPage.module.css";
import Button from "../../Components/Button/Button";

import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";
import { withRouter } from "react-router-dom";

const AdminPage = (props) => {
  const [dismiss, setDismiss] = useState(false);

  const Transition = (path) => {
    onDismiss(() => props.history.push(path));
  };

  const onDismiss = (callback) => {
    setDismiss(true);
    setTimeout(() => {
      callback();
      setDismiss(false);
    }, 500);
  };

  return (
    <div className={classes.Center + " " + (dismiss ? classes.dismiss : "")}>
      <Card shadow className={classes.Container}>
        <Card className={classes.Card} shadow>
          <div className={classes.background}>{/*insert your image here*/}</div>
          <div className={classes.User}>
            <div className={classes.main}>
              <ImageHolder className={classes.Pic} filler={filler} />
              <div className={classes.Details}>
                <div className={classes.filler} />
                <div className={classes.Name}>{props.userData.Name}</div>
                <div>Third Year{/*get from database*/}</div>
                <div>Computer Engineering{/*get from database*/}</div>
              </div>
            </div>
          </div>
        </Card>
        <div className={classes.Bottom}>
          <div className={classes.Buttons}>
            <Button
              className={classes.Button}
              value="Add User"
              type="button"
              onClick={Transition.bind(this, "/SignUp")}
            />
            <Button
              className={classes.Button}
              value="Add Course"
              type="button"
              onClick={Transition.bind(this, "/AddCourse")}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPage)
);
