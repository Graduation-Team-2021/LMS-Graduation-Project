import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FilePicker } from "react-file-picker";

import filler from "../../assets/Filler.png";
import classes from "./ProfilePage.module.css";

import Card from "../../Components/Card/Card";
import OldCourses from "../OldCourses/OldCourses";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";
import Button from "../../Components/Button/Button";

import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";
import {
  getFinishedCourses,
  getRecentUserPosts,
  getRecentEvent,
  getUser,
  getGradeSoFar,
  url,
  updatePic,
  getYear,
  getDegree,
  getTeachedCourses,
} from "../../Interface/Interface";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import { setFullUserPost } from "../../Models/Post";
import { setEvent } from "../../Models/Event";

const ProfilePage = (props) => {
  const [Finished, setFinished] = useState([]);

  const [userSelf, setuserSelf] = useState(null);

  const [grade, setGrade] = useState(0);

  const { Token, ID, Role, Name } = props.userData;

  const { tokenError: TokenError } = props.userDataActions;

  const { recentEvent } = props;

  const RecentEvent = recentEvent.recentEvent;

  const setRecentEvent = props.recentEventsActions.onSetRecentEvents;

  const [year, setYear] = useState(0);

  const handleFIleUpload = (file) => {
    Submit(file);
  };

  const Submit = (files) => {
    console.log(files);
    //uploadFile(this.props.Token, this.state.file, this.props.CourseID);
    updatePic(props.userData.ID, files).then((res) => {
      if (res) {
        const temp = { ...userSelf };
        temp.picture = url + res.picture;
        props.userDataActions.onSetPic(url + res.picture);
        localStorage.setItem("pic", url + res.picture);
        setuserSelf(temp);
      }
    });
  };

  useEffect(() => {
    if (!RecentEvent)
      getRecentEvent(Token, ID, Role).then((res) => {
        if (res) {
          setRecentEvent(setEvent(res));
        } else {
          TokenError();
        }
      });
  }, [Token, ID, Role, TokenError, RecentEvent, setRecentEvent]);

  useEffect(() => {
    getUser(ID).then((res) => {
      res.picture = url + res.picture;
      setuserSelf(res);
    });
  }, [ID]);

  useEffect(() => {
    if (Role === "student") {
      getFinishedCourses(Token, ID, Role).then((res) => {
        const Courses = [];
        res.forEach((C) =>
          Courses.push({
            Title: `${C["course_code"]}: ${C["course_name"]}`,
            grade: C["course_mark"],
          })
        );
        setFinished(Courses);
      });
    } else {
      getTeachedCourses(ID).then((res) => {
        if (res) setFinished(res);
      });
    }
  }, [Token, ID, Role]);

  useEffect(() => {
    if (Role === "student") {
      getGradeSoFar(ID).then((res) => {
        setGrade(res.reduce((a, b) => a + b["course_mark"], 0));
      });
    } else {
      getDegree(ID).then(res=>{
        if (res) {
          setGrade(res.scientific_degree||"N/A")
        }
      })
    }
  }, [ID, Role]);

  useEffect(() => {
    if (Role === "student") {
      getYear(ID).then((res) => {
        if (res) setYear(res.student_year);
      });
    }
  }, [ID, Role]);

  document.title = props.userData.Name;

  return (
    <div className={classes.Center}>
      <Card shadow className={classes.Container}>
        <Card className={classes.Card} shadow>
          <div className={classes.background}>{/*insert your image here*/}</div>
          <div className={classes.User}>
            <div className={classes.main}>
              <ImageHolder
                className={classes.Pic}
                filler={
                  userSelf && userSelf["picture"] ? userSelf["picture"] : filler
                }
              />
              <span className={classes.D}>
                <div className={classes.filler} />
                <span className={classes.DD}>
                  <div className={classes.Details}>
                    <div className={classes.Name}>{props.userData.Name}</div>
                    {Role==='student'?<div>Year: {year}</div>:null}
                  </div>
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
                </span>
              </span>
            </div>
            <div className={classes.small}>
              <Card shadow className={classes.Note}>
                <h2>
                  {Role === "student" ? "Passed Courses" : "Current Courses"}
                </h2>
                <h1>{Finished.length}</h1>
              </Card>
              <Card shadow className={classes.Note}>
                <h2>{Role === "student" ? "Total Grade" : "Current Title"}</h2>
                <h1>{grade}</h1>
              </Card>
            </div>
          </div>
        </Card>
        <div className={classes.Bottom}>
          {Role === "student" ? (
            Finished.length !== 0 ? (
              <OldCourses Title="Your Passed Courses" Courses={Finished} />
            ) : (
              <h1>Loading.....</h1>
            )
          ) : null}
          <PostsArea
            Title="Your Posts"
            LoadingPosts={getRecentUserPosts}
            setPost={(ele, ID) => setFullUserPost(ele, ID, Name)}
          />
        </div>
      </Card>
      {RecentEvent ? <Upcoming Event={RecentEvent} /> : <h1>Loading.....</h1>}
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
