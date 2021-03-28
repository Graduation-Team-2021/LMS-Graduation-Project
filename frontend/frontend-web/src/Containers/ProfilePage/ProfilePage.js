import classes from "./ProfilePage.module.css";
import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import CoursesArea from "../CoursesArea/CoursesArea";
import GroupsArea from "../GroupsArea/GroupsArea";
import OldCourses from "../OldCourses/GroupsArea";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";
import { getFinishedCourses } from "../../Interface/Interface";

const HomePage = (props) => {
  const [Joined, setJoined] = useState(new Map());
  const [CurrentCourses, setCurrentCourses] = useState(new Map());
  const [Posts, setPosts] = useState([]);
  const [Finished, setFinished] = useState([]);

  const {
    CurrentCourses: CC,
    Joined: J,
    Posts: P,
    Event,
    Token,
    ID,
    Role,
  } = props;

  useEffect(() => {
    if (J && J.size !== 0) {
      setJoined(J);
    }
    if (CC && CC.size !== 0) {
      setCurrentCourses(CC);
    }
    if (P && P.length !== 0) {
      setPosts(P);
    }
  }, [CC, J, P]);

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

export default HomePage;
