import classes from "./GroupsPage.module.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../Components/Card/Card";
import CourseListItem from "../../Components/GroupsPageComponents/CourseListItem/CourseListItem";
import CourseOverView from "../../Components/GroupsPageComponents/CourseOverview/CourseOverview";
import Waiting from "../../Components/Waiting/Waiting";

import {
  getGroups,
  BE_G_Enroll,
} from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setGroup } from "../../Models/Group";

const HomePage = (props) => {
  const [Groups, setGroups] = useState({});
  const [displayedGroup, setdisplayedGroup] = useState(null);
  const { Token, ID } = props.userData;
  const { TokenError } = props.userDataActions;
  const { currentGroups } = props.currentGroups;
  const [loading, setLoading] = useState(true);

  const Enroll = () => {
    //TODO:enroll in Backend
    BE_G_Enroll(ID, Token, displayedGroup).then((res) => {
      if (res) {
        var temp = { ...Groups };
        temp[displayedGroup].isEnrolled = "true";
        setGroups(temp);
        alert("Enroll Successful");
      }
      else {
        alert("Enroll Failed, please Try Again");
      }
    });
  };

  const selectingGroupHandler = (Groupid) => {
    setdisplayedGroup(Groupid);
  };

  const removingFromTheStageHandler = () => {
    setdisplayedGroup(null);
  };

  useEffect(() => {
    getGroups(Token).then((res) => {
      setLoading(false);
      if (res) {
        console.log(props.currentGroups)
        let Groups = new Map();
        res.forEach((id) => {
          id["pic"] = "https://picsum.photos/200/300";
          id["isenrolled"] = "false";
          if (
            Array.from(currentGroups.keys()).includes(id["group_id"]) ||
            res.find((value) => value.group_id === id["group_id"])
          ) {
            id["isenrolled"] = "true";
          }
          if (props.location.state) {
            if (id["isenrolled"] === "false") {
              Groups[id["group_id"]] = setGroup(id);
            }
          } else {
            Groups[id["group_id"]] = setGroup(id);
          }
        });
        console.log("====================================");
        console.log(Groups);
        console.log("====================================");
        setGroups(Groups);
      } else {
        TokenError();
      }
    });
  }, [
    ID,
    Token,
    TokenError,
    currentGroups,
    props.location.state,
  ]);

  let loadedGroups = [];
  Array.from(Object.keys(Groups)).forEach((key) => {
    loadedGroups.push(
      <CourseListItem
        {...Groups[key]}
        key={key}
        id={key}
        getSelected={selectingGroupHandler}
        displayedGroup={displayedGroup}
      />
    );
  });

  let stage = (
    <div className={classes.CourseOverview}>
      <CourseOverView
        Group={Groups[displayedGroup]}
        {...Groups[displayedGroup]}
        removeHandler={removingFromTheStageHandler}
        Enroll={Enroll}
      />
    </div>
  );
  if (displayedGroup === null) {
    stage = null;
  }

  return (
    <div className={classes.Center}>
      <Card shadow className={classes.Card}>
        <Waiting Loading={loading}>
          <div className={classes.CoursesPage}>
            <div className={classes.CoursesList}>{loadedGroups}</div>
            {stage}
          </div>
        </Waiting>
      </Card>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
