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
            let Liked = false;
            for (const id in ele["likes"]) {
              console.log(ID, id["liker_id"]);
              if (id["liker_id"] === ID) {
                Liked = true;
                break;
              }
            }
            Posts.push({
              Name: ele["name"],
              Location: ele["owner_name"],
              Title: `Post by ${ele["name"]}, in ${ele["owner_name"]}`,
              Desc: ele["post_text"],
              PostId: ele["post_id"],
              Likes: ele["likes"],
              isLiked: Liked,
              Comments: ele['comments']
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

  return (
    <div className={classes.Center}>
      <div className={classes.contanier}>
        <Card
          style={{
            alignItems: "flex-start",
            flex: "3",
            height: "fit-content",
          }}
        >
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
