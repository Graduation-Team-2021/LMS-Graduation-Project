import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import classes from "./ProfilePage.module.css";

import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import CoursesArea from "../CoursesArea/CoursesArea";
import GroupsArea from "../GroupsArea/GroupsArea";
import OldCourses from "../OldCourses/GroupsArea";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";

import { mapStateToProps,mapDispatchToProps } from "../../store/reduxMaps";
import { getFinishedCourses } from "../../Interface/Interface";

const ProfilePage = (props) => {
  const [Joined, setJoined] = useState(new Map());
  const [CurrentCourses, setCurrentCourses] = useState(new Map());
  const [Posts, setPosts] = useState([]);
  const [Finished, setFinished] = useState([]);

  const {
    Token,
    ID,
    Role,
  } = props.userData;

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
    <div className={classes.Main}>
      <Card
        style={{
          backgroundColor: "rgba(243, 238, 238, 0.9)",
          height: "fit-content",
        }}
      >
        <TopBar
          Name={props.Name}
          id={props.id}
          setLogged={props.setLogged}
          Notif={Posts}
        />
        <div className={classes.Center}>
          <div
            style={{
              maxWidth: "80%",
            }}
          >
            <Card
              style={{
                alignItems: "flex-start",
                flex: "3",
                height: "fit-content",
              }}
            >
              {CurrentCourses.size !== 0 ? (
                <CoursesArea
                  Courses={CurrentCourses}
                  Token={props.Token}
                  setCourses={props.Courses}
                />
              ) : (
                <h1>Loading.....</h1>
              )}
              {Joined.size !== 0 ? (
                <GroupsArea Groups={Joined} />
              ) : (
                <h1>Loading.....</h1>
              )}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                }}
              >
                {Finished.length !== 0 ? (
                  <OldCourses
                    flex="2"
                    Title="Your Passed Courses"
                    Courses={Finished}
                  />
                ) : (
                  <h1>Loading.....</h1>
                )}
                {Posts.length !== 0 ? (
                  <PostsArea flex="5" Title="Your Posts" Posts={Posts} />
                ) : (
                  <h1>Loading.....</h1>
                )}
              </div>
            </Card>
          </div>
          {Event ? <Upcoming Event={Event} /> : <h1>Loading.....</h1>}
        </div>
      </Card>
    </div>
  );
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProfilePage));
