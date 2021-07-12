import classes from "./MainPage.module.css";
import React, { useState } from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import ChatWindow from '../../Components/PopupChatWindow/Window'


const MainPage = (props) => {


  return (
    <div className={classes.Main}>
      <Card className={classes.David}>
        <TopBar Name={props.Name}/>
        {props.children}
        <ChatWindow />
      </Card>
    </div>
  );
};

export default MainPage;
