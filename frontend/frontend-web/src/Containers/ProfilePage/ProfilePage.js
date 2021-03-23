import classes from "./ProfilePage.module.css";
import React from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import CoursesArea from "../CoursesArea/CoursesArea";
import GroupsArea from "../GroupsArea/GroupsArea";
import OldCourses from "../OldCourses/GroupsArea";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";

const HomePage = (props) => {



  return (
    <div className={classes.Main}>
      <Card
        style={{
          backgroundColor: "rgba(243, 238, 238, 0.9)",
          height: "fit-content",
        }}
      >
        <TopBar Name={props.Name} id={props.id}/>
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
              <CoursesArea />
              <GroupsArea />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                }}
              >
              
                <OldCourses flex="2" Title="Your Passed Courses" />
                <PostsArea flex="5" Title="Your Posts" />
              </div>
            </Card>
          </div>
          <Upcoming Host="DJ Man"/>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
