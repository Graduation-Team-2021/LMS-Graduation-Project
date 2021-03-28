import classes from "./HomePage.module.css";
import React from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import CoursesPags from "../../Adham/Containers/CoursesPage/CoursesPage";

const HomePage = (props) => {
  

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
              width: "100%",
            }}
          >
            <Card
              style={{
                alignItems: "flex-start",
                flex: "3",
                height: "fit-content",
              }}
            >
              <CoursesPags Courses={props.Courses}/>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
