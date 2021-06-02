import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import Card from "../../Components/Card/Card";
import filler from "../../assets/Filler.png";
import classes from "./AdminPage.module.css";
import Button from "../../Components/Button/Button";

import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";
import { updatePic, getUser } from "../../Interface/Interface";

const AdminPage = (props) => {
  const [dismiss, setDismiss] = useState(false);

  const [userSelf, setuserSelf] = useState(null);

  const [files, setfiles] = useState(null);

  const { Token, ID, Role, Name } = props.userData;

  const handleFIleUpload = (event) => {
    setfiles(
      //TODO: enable Multiple Files
      /* (state, props)=>{
      let temp = [...state.file]
      temp.push(event.target.value)
      return {
        file: temp
      }
    } */
      event.target.files[0]
    );
  };

  useEffect(() => {
    getUser(ID).then(res=>{
      console.log(res['picture']);
      setuserSelf(res)
    })
  }, [ID])

  const Submit = () => {
    console.log(files);
    //uploadFile(this.props.Token, this.state.file, this.props.CourseID);
    updatePic(props.userData.ID, files)
  };

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
              <ImageHolder className={classes.Pic} filler={userSelf?userSelf['picture']:filler} />
              <div className={classes.Details}>
                <div className={classes.filler} />
                <div className={classes.Name}>{props.userData.Name}</div>
                <div>Third Year{/*get from database*/}</div>
                <div>Computer Engineering{/*get from database*/}</div>
              </div>
            </div>
            <Card shadow className={classes.small}>
              <label
                style={{
                  padding: "0 0 10% 0",
                }}
              >
                Select files:
              </label>
              <input
                type="file"
                id="myfile"
                name="myfile"
                multiple
                onChange={handleFIleUpload}
              />
              <br></br>
              <input type="submit" onClick={Submit} />
            </Card>
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
