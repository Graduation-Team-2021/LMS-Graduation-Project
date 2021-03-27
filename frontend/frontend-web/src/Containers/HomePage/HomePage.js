import classes from "./HomePage.module.css";
import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import CoursesArea from "../CoursesArea/CoursesArea";
import GroupsArea from "../GroupsArea/GroupsArea";
import RecommendedGroups from "../RecommendedGroups/GroupsArea";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";

const HomePage = (props) => {
  const [Recommended, setRecommended] = useState(new Map());
  const [Joined, setJoined] = useState(new Map());
  const [CurrentCourses, setCurrentCourses] = useState(new Map());

  const {CurrentCourses: CC, Joined: J, Recommended: R } = props


  useEffect(() => {
    if (R && R.size !== 0) {
      setRecommended(R);
    }
    if (J && J.size !== 0) {
      setJoined(J);
    }
    if (CC && CC.size !== 0) {
      setCurrentCourses(CC);
    }
  }, [CC, J, R, props]);
  
  return (
    <div className={classes.Main}>
      <Card
        style={{
          backgroundColor: "rgba(243, 238, 238, 0.9)",
          height: "fit-content",
        }}
      >
        <TopBar Name={props.Name} id={props.id} setLogged={props.setLogged}/>
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
                  {CurrentCourses.size!==0?<CoursesArea Courses={CurrentCourses} Token={props.Token} setCourses={props.Courses} />:<h1>Loading.....</h1>}
              {Joined.size !== 0 ? (
                <GroupsArea Groups={Joined} />
              ) : (
                <h1>Loading.....</h1>
              )}
                <PostsArea flex="5" Title="Latest Posts" />
            </Card>
          </div>
          <Upcoming Host="DJ Man" />
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
