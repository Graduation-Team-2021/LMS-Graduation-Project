import classes from "./HomePage.module.css";
import React, {useState, useEffect} from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import CoursesPags from "../../Adham/Containers/CoursesPage/CoursesPage";
import { getCourses } from "../../Interface/Interface";

const HomePage = (props) => {

  const [Courses, setCourses] = useState(new Map());

  const {Token}=props

  useEffect(() => {
    getCourses(Token).then(
      (res)=>{
        setCourses(res)
      }
    )
  }, [Token])


  return (
    <div className={classes.Main}>
      <Card
        style={{
          backgroundColor: "rgba(243, 238, 238, 0.9)",
          height: "fit-content",
        }}
      >
        <TopBar Name={props.Name} id={props.id} Notif={props.Posts}/>
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
              {Courses.size!==0?<CoursesPags Courses={Courses}/>:<h1>Loading.....</h1>}
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
