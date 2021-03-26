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
  const [Recommended, setRecommended] = useState(props.Recommended);
  const [Joined, setJoined] = useState(props.Joined);

  useEffect(() => {
    if (props.Recommended.size !== 0) {
      setRecommended(props.Recommended);
    }
    if (props.Joined.size !== 0) {
      setJoined(props.Joined);
    }
  }, [props]);

  return (
    <div className={classes.Main}>
      <Card
        style={{
          backgroundColor: "rgba(243, 238, 238, 0.9)",
          height: "fit-content",
        }}
      >
        <TopBar Name={props.Name} id={props.id} />
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
                  {CurrentCourses.size!==0?<CoursesArea Courses={CurrentCourses} />:<h1>Loading.....</h1>}
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
