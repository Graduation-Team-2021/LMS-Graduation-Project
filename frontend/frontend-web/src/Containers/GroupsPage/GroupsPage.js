import classes from "./GroupsPage.module.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../Components/Card/Card";
import CourseListItem from "../../Components/GroupsPageComponents/GroupListItem/GroupListItem";
import CourseOverView from "../../Components/GroupsPageComponents/GroupOverview/GroupOverview";
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
        let Groups = new Map();
        res.forEach((id) => {
          id["isEnrolled"] = "false";
          if (
            Array.from(currentGroups.keys()).includes(id["group_id"])) {
            id["isEnrolled"] = "true";
          }
          Groups[id["group_id"]] = setGroup(id);
        });
        console.log("====================================");
        console.log(Groups, res);
        console.log("====================================");
        setGroups(Groups);
      } else {
        TokenError();
      }
    });
  }, [ID, Token, TokenError, currentGroups, props.currentGroups, props.location.state]);

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
        id={displayedGroup}
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
