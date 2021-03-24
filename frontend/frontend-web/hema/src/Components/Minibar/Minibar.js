import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./Minibar.module.css";

const Minibar = (props) => {
  return (
    <div className={classes.Main}>
      <div className={classes.holder} style={{
          
      }}>
          <FontAwesomeIcon icon={faSquare} size="4x" color={props.color} fixedWidth/>
          <FontAwesomeIcon
            icon={props.icon}
            size="2x"
            color="white"
            className={classes.inner}
          />
      </div>
      <div className={classes.info}>{props.info}</div>
    </div>
  );
};

export default Minibar;
