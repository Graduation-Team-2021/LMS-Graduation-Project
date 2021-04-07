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
  getCurrentCourses,
  getCurrentGroups,
  getRecentPosts,
  getRecentEvent,
} from "../../Interface/Interface";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";

const ProfilePage = (props) => {
  const [Finished, setFinished] = useState([]);

  const { Token, ID, Role } = props.userData;

  const { tokenError: TokenError } = props.userDataActions;

  const { currentCourses, recentEvent, currentGroups, recentUserPosts } = props;

  const CurrentCourses = currentCourses.currentCourses;
  const RecentEvent = recentEvent.recentEvent;
  const Joined = currentGroups.currentGroups;
  const Posts = recentUserPosts.userRecentPosts;

  const setCurrentCourses = props.currentCoursesActions.onSetCurrentCourses;
  const setJoined = props.currentGroupsActions.onSetCurrentGroups;
  const setRecentEvent = props.recentEventsActions.onSetRecentEvents;
  const setPosts = props.recentUserPostsActions.onSetRecentUserPosts;

  useEffect(() => {
    if (CurrentCourses.size === 0)
      getCurrentCourses(Token).then((res) => {
        const Courses = new Map();
        if (res) {
          res.forEach((element) => {
            Courses.set(element["course_code"], {
              Title: element["course_name"],
              Desc: element["course_description"],
              Post: element["post_owner_id"],
            });
          });
          setCurrentCourses(Courses);
        } else {
          TokenError();
        }
      });
  }, [Token, TokenError, setCurrentCourses, CurrentCourses]);

  useEffect(() => {
    if (Joined.size === 0)
      getCurrentGroups(Token).then((res) => {
        const Courses = new Map();
        if (res) {
          res.forEach((element) => {
            Courses.set(element["group_id"], {
              Title: element["group_name"],
              Desc: element["group_description"],
              Post: element["post_owner_id"],
            });
          });
          setJoined(Courses);
        } else {
          TokenError();
        }
      });
  }, [TokenError, Token, ID, Role, setJoined, Joined]);

  useEffect(() => {
    if (Posts.length === 0)
      getRecentPosts(Token, ID).then((res) => {
        const Posts = [];
        if (res) {
          res.forEach((ele) => {
            Posts.push({
              Name: ele["name"],
              Location: ele["owner_name"],
              Title: `Post by ${ele["name"]}, in ${ele["owner_name"]}`,
              Desc: ele["post_text"],
              PostId: ele["post_id"],
            });
          });
          setPosts(Posts);
        } else {
          TokenError();
        }
      });
  }, [Token, ID, Role, setPosts, Posts, TokenError]);

  useEffect(() => {
    if (!RecentEvent)
      getRecentEvent(Token, ID, Role).then((res) => {
        if (res) {
          setRecentEvent({
            Title: res["event_name"],
            Desc: res["event_description"],
            Type: res["event_type"],
            Duration: res["event_duration"],
            Date: res["event_date"].slice(0, 10),
            Host: res["course_code"],
            Time: res["event_date"].slice(11),
          });
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
        <Card className={classes.User} shadow>
          <ImageHolder className={classes.Pic} filler={filler} />
          <div className={classes.Details}>
            <h2>{props.userData.Name}</h2>
            <div>Third Year Student</div>
            <div>Computer Engineering</div>
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
