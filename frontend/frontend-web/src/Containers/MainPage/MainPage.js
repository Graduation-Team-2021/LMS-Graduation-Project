import classes from "./MainPage.module.css";
import React, { useState } from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";

const MainPage = (props) => {


  return (
    <div className={classes.Main}>
      <Card className={classes.David}>
        <TopBar Name={props.Name}/>
        {props.children}
      </Card>
    </div>
  );
};

export default MainPage;
