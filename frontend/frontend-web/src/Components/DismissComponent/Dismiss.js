import React, { useState } from "react";

import Card from "../Card/Card";

import classes from "./Dismiss.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const Dismiss = (props) => {
  const [Dismissed, setDismissed] = useState(false);
  const [List, setList] = useState(props.children);

  const onDismiss = () => {
    setDismissed(true);
    setTimeout(() => {
      let temp = [...List];
      temp.pop();
      setList(temp);
      setDismissed(false);
    }, 500);
  };

  let Main = (
    <Card
      style={{
        border: "2px solid purple",
        padding: "0",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <h1>No More {props.Title}</h1>
    </Card>
  );

  if (List.length !== 0)
    Main = (
      <Card
        style={{
          padding: "5% 0",
          border: "2px solid purple",
          overflow: "hidden",
          zIndex: "10",
          height: "100%",
          position: "relative",
        }}
      >
        {List[List.length - 1]}
        <div onClick={onDismiss} className={classes.dismissButton}>
          <FontAwesomeIcon icon={faTimesCircle} size="4x" />
        </div>
      </Card>
    );

  let Back = null;
  if (List.length > 1) {
    Back = (
      <Card
        style={{
          padding: "5% 0",
          border: "2px solid purple",
          overflow: "hidden",
          zIndex: "10",
          height: "100%",
          position: "relative",
        }}
      >
        {List[List.length - 2]}
        <div onClick={onDismiss} className={classes.dismissButton}>
          <FontAwesomeIcon icon={faTimesCircle} size="4x" />
        </div>
      </Card>
    );
  } else if (List.length !== 0 || (List.length === 0 && Dismissed)) {
    Back = (
      <Card
        style={{
          border: "2px solid purple",
          padding: "0",
          overflow: "hidden",
          height: "100%",
          zIndex: "10",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <h1>No More {props.Title}</h1>
      </Card>
    );
  }

  let Back2 = null;
    if(Dismissed){if (List.length > 2) {
      Back2 = (
        <Card
          style={{
            padding: "5% 0",
            border: "2px solid purple",
            overflow: "hidden",
            zIndex: "10",
            height: "100%",
            position: "relative",
          }}
        >
          {List[List.length - 3]}
          <div onClick={onDismiss} className={classes.dismissButton}>
            <FontAwesomeIcon icon={faTimesCircle} size="4x" />
          </div>
        </Card>
      );
    } else if (List.length !== 1||(List.length===1&&!Dismissed)) {
      Back2 = (
        <Card
          style={{
            border: "2px solid purple",
            padding: "0",
            overflow: "hidden",
            height: "100%",
            zIndex: "10",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <h1>No More {props.Title}</h1>
        </Card>
      );
    }}
  

  return (
    <div className={classes.holder}>
      <div className={classes.front + " " + (Dismissed ? classes.dismiss : "")}>
        {Main}
      </div>
      <div className={Dismissed ? classes.appear : classes.behind}>{Back}</div>
      <div className={Dismissed ? classes.otherappear : classes.otherbehind}>
        {Back2}
      </div>
    </div>
  );
};

export default Dismiss;
