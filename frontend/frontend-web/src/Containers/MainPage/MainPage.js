import classes from "./MainPage.module.css";
import React from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";

const HomePage = (props) => {
  return (
    <div className={classes.Main}>
      <Card
        style={{
          backgroundColor: "rgba(243, 238, 238, 0.9)",
          height: "fit-content",
        }}
      >
        <TopBar Name={props.Name}/>
        {props.children}
      </Card>
    </div>
  );
};

export default HomePage;
