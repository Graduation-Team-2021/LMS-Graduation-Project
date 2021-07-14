import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FilePicker } from "react-file-picker";

import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import Card from "../../Components/Card/Card";
import filler from "../../assets/Filler.png";
import classes from "./AdminPage.module.css";
import Button from "../../Components/Button/Button";

import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";
import { updatePic, getUser, url } from "../../Interface/Interface";

const AdminPage = (props) => {
  const [dismiss, setDismiss] = useState(false);

  const [userSelf, setuserSelf] = useState(null);

  const { ID } = props.userData;

  const handleFIleUpload = (file) => {
    Submit(file)
  };

  useEffect(() => {
    getUser(ID).then((res) => {
      res.picture = url + res.picture
      setuserSelf(res);
    });
  }, [ID]);

  const Submit = (files) => {
    console.log(files);
    //uploadFile(this.props.Token, this.state.file, this.props.CourseID);
    updatePic(props.userData.ID, files).then((res)=>{
      if(res){
        const temp = {...userSelf};
        temp.picture = url+res.picture
        props.userDataActions.onSetPic(url+res.picture)
        localStorage.setItem('pic', url+res.picture)
        setuserSelf(temp);
      }
    });
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
            {console.log(userSelf)}
              <ImageHolder
                className={classes.Pic}
                filler={
                  userSelf && userSelf["picture"] ? userSelf["picture"] : filler
                }
              />
              <span className={classes.D}>
                <div className={classes.Details}>
                  <div className={classes.filler} />
                  <div className={classes.Name}>{props.userData.Name}</div>
                  <FilePicker
                    onChange={(FileObject) => {
                      handleFIleUpload(FileObject);
                    }}
                    onError={(errMsg) => {
                      /* do something with err msg string */
                    }}
                  >
                    <Button className={classes.Button2}>Change Pic</Button>
                  </FilePicker>
                </div>
              </span>
            </div>
          </div>
        </Card>
        <div className={classes.Bottom}>
          <div className={classes.Buttons}>
            <Button
              className={classes.Button}
              onClick={Transition.bind(this, "/SignUp")}
            >
              Add User
            </Button>
            <Button
              className={classes.Button}
              onClick={Transition.bind(this, "/AddCourse")}
            >
              Add Course
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPage)
);
