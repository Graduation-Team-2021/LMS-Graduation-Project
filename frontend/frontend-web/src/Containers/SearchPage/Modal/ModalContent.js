import React from "react";
import Course from "./Course/Course";
import Group from "./Group/Group";
import User from "./User/User";

const Content = (props) => {
  return (
    <React.Fragment>
      {props.Data!==null?(props.Type === "User" ? (
        <User Data={props.Data}/>
      ) : props.Type === "Course" ? (
        <Course Data={props.Data}/>
      ) : (
        <Group Data={props.Data}/>
      )):null}
    </React.Fragment>
  );
};

export default Content;
