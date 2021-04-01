import React, { useState, useEffect } from "react";

import CoursesArea from "../CoursesArea/CoursesArea";
import GroupsArea from "../GroupsArea/GroupsArea";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";
import Card from "../../Components/Card/Card";
import classes from "./HomePage.module.css";
import {setToken} from '../../store/actions/userDataActions'

import { connect } from "react-redux";

import {
  getCurrentCourses,
  getCurrentGroups,
  getRecentPosts,
  getRecentEvent,
} from "../../Interface/Interface";

const HomePage = (props) => {
  const [Joined, setJoined] = useState(null);
  const [CurrentCourses, setCurrentCourses] = useState(null);
  const [Posts, setPosts] = useState(null);
  const [RecentEvent, setRecentEvent] = useState(null);

  const { Token, ID, Role } = props.userData;
  const TokenError = props.tokenError; //FIXME: the shady bug would live inside this strange line;

  useEffect(() => {
    getCurrentCourses(Token).then((res) => {
      const Courses = new Map();
      if (res) {
        console.log(res);
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
    getRecentPosts(Token, ID).then((res) => {
      const Posts = [];
      if (res) {
        res.forEach((ele) => {
          Posts.push({
            Name: ele["name"],
            Location: ele["owner_name"],
            Title: `Post by ${ele["name"]}, in ${ele["owner_name"]}`,
            Desc: ele["post_text"],
          });
        });
        setPosts(Posts);
      } else {
        TokenError();
      }
    });
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
  }, [Token, ID, Role, TokenError]);

  return (
    <div className={classes.Center}>
      <div
        style={{
          width: "80%",
        }}
      >
        <Card
          style={{
            alignItems: "flex-start",
            flex: "3",
            height: "fit-content",
          }}
        >
          {CurrentCourses ? (
            <CoursesArea Courses={CurrentCourses} Token={Token} />
          ) : (
            <h1>Loading.....</h1>
          )}
          {Joined ? <GroupsArea Groups={Joined} /> : <h1>Loading.....</h1>}

          {Posts ? (
            <PostsArea flex="5" Title="Latest Posts" Posts={Posts} />
          ) : (
            <h1>Loading.....</h1>
          )}
        </Card>
      </div>
      {RecentEvent ? <Upcoming Event={RecentEvent} /> : <h1>Loading.....</h1>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userDataReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDataActions: {
      onSetToken: (newToken) => dispatch(setToken(newToken)),
      tokenError: () => dispatch(setToken(null)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
