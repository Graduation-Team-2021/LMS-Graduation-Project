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
  getRecentUserPosts,
  getRecentEvent,
} from "../../Interface/Interface";
import ImageHolder from "../../Components/ImageHolder/ImageHolder";

const ProfilePage = (props) => {
  const [Finished, setFinished] = useState([]);
  const [Posts, setPosts] = useState([]);

  const { Token, ID, Role, Name } = props.userData;

  const { tokenError: TokenError } = props.userDataActions;

  const { currentCourses, recentEvent, currentGroups } = props;

  const CurrentCourses = currentCourses.currentCourses;
  const RecentEvent = recentEvent.recentEvent;
  const Joined = currentGroups.currentGroups;

  const setCurrentCourses = props.currentCoursesActions.onSetCurrentCourses;
  const setJoined = props.currentGroupsActions.onSetCurrentGroups;
  const setRecentEvent = props.recentEventsActions.onSetRecentEvents;

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
    //TODO: Get the User Posts
    getRecentUserPosts(Token, ID).then((res) => {
      const Posts = [];
      if (res) {
        res.forEach((ele) => {
          let Liked = false;
          for (const id in ele["likes"]) {
            console.log(ID, id['liker_id']);
            if (id['liker_id']===ID) {
              Liked = true;
              break;
            }
          }
          Posts.push({
            Name: Name,
            Location: ele["owner_name"],
            Title: `Post by ${Name}, in ${ele["owner_name"]}`,
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
  }, [Token, ID, Role, Name, TokenError]);

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
