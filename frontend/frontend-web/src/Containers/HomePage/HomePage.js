import React, { useEffect } from "react";

import CoursesArea from "../CoursesArea/CoursesArea";
import GroupsArea from "../GroupsArea/GroupsArea";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";
import Card from "../../Components/Card/Card";
import classes from "./HomePage.module.css";
import { connect } from "react-redux";

import {
  getCurrentCourses,
  getCurrentGroups,
  getRecentPosts,
  getRecentEvent,
} from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setCourse } from "../../Models/Course";
import { setFullPost } from "../../Models/Post";
import { setGroup } from "../../Models/Group";
import { setEvent } from "../../Models/Event";

const HomePage = (props) => {
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
            Courses.set(element["course_code"], setCourse(element));
          });
          setCurrentCourses(Courses);
        } else {
          TokenError();
        }
      });
  }, [Token, TokenError, setCurrentCourses]);

  useEffect(() => {
    if (Joined.size === 0)
      getCurrentGroups(Token).then((res) => {
        const Groups = new Map();
        if (res) {
          res.forEach((element) => {
            Groups.set(element["group_id"], setGroup(element));
          });
          setJoined(Groups);
        } else {
          TokenError();
        }
      });
  }, [TokenError, Token, ID, Role, setJoined]);

  useEffect(() => {
    if (Posts.length === 0)
      getRecentPosts(Token, ID).then((res) => {
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
  }, [Token, ID, Role, setPosts, Posts, TokenError]);

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

  return (
    <div className={classes.Center}>
      <div className={classes.contanier}>
        <Card shadow className={classes.Card}>
          {CurrentCourses.size !== 0 ? (
            <CoursesArea Courses={CurrentCourses} />
          ) : (
            <h1>Loading.....</h1>
          )}
          {Joined.size !== 0 ? (
            <GroupsArea Groups={Joined} />
          ) : (
            <h1>Loading.....</h1>
          )}
          {Posts.length !== 0 ? (
            <PostsArea Title="Latest Posts" Posts={Posts} />
          ) : (
            <h1>Loading.....</h1>
          )}
        </Card>
      </div>
      {RecentEvent ? <Upcoming Event={RecentEvent} /> : <h1>Loading.....</h1>}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
