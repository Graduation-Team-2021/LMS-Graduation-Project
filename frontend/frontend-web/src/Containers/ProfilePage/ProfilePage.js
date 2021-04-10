import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import filler from "../../assets/Filler.png";
import classes from "./ProfilePage.module.css";

import Card from "../../Components/Card/Card";
import OldCourses from "../OldCourses/OldCourses";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";

import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";
import {
  getFinishedCourses,
  getRecentUserPosts,
  getRecentEvent,
} from "../../Interface/Interface";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import { setFullPost } from "../../Models/Post";
import { setEvent } from "../../Models/Event";

const ProfilePage = (props) => {
  const [Finished, setFinished] = useState([]);
  const [Posts, setPosts] = useState([]);

  const { Token, ID, Role, Name } = props.userData;

  const { tokenError: TokenError } = props.userDataActions;

  const { recentEvent } = props;

  const RecentEvent = recentEvent.recentEvent;

  const setRecentEvent = props.recentEventsActions.onSetRecentEvents;

  useEffect(() => {
    //TODO: Get the User Posts
    getRecentUserPosts(Token, ID).then((res) => {
      const Posts = [];
      if (res) {
        res.forEach((ele) => {
          Posts.push(setFullPost(ele, ID));
        });
        setPosts(Posts);
      } else {
        TokenError();
      }
    });
  }, [Token, ID, Role, Name, TokenError]);

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
  }, [Token, ID, Role]);

  return (
    <div className={classes.Center}>
      <Card className={classes.Container}>
        <Card className={classes.Card} shadow>
          <div className={classes.background}>{/*insert your image here*/}</div>
          <div className={classes.User}>
            <ImageHolder className={classes.Pic} filler={filler} />
            <div className={classes.Details}>
              <div className={classes.filler} />
              <div className={classes.Name}>{props.userData.Name}</div>
              <div>Third Year{/*get from database*/}</div>
              <div>Computer Engineering{/*get from database*/}</div>
            </div>
            <Card shadow className={classes.Note}>
              <h2>Passed Courses</h2>
              <h1>50{/*get from database*/}</h1>
            </Card>
            <Card shadow className={classes.Note}>
              <h2>Total Grade</h2>
              <h1>50{/*get from database*/}</h1>
            </Card>
          </div>
        </Card>
        <div className={classes.Bottom}>
          {Finished.length !== 0 ? (
            <OldCourses Title="Your Passed Courses" Courses={Finished} />
          ) : (
            <h1>Loading.....</h1>
          )}
          {Posts.length !== 0 ? (
            <PostsArea Title="Your Posts" Posts={Posts} />
          ) : (
            <h1>Loading.....</h1>
          )}
        </div>
      </Card>
      {RecentEvent ? <Upcoming Event={RecentEvent} /> : <h1>Loading.....</h1>}
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
