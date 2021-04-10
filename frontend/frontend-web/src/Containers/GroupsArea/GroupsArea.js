import React, { Component } from "react";

import GroupPreview from "../../Components/GroupPreview/CoursePreview";
import SwipeList from "../../Components/SwipeList/SwipeList";
import classes from "./GroupsArea.module.css";

class GroupsArea extends Component {
  render() {
    let ids = Array.from(this.props.Groups.keys());
    let Groups = [];

    for (let index = 0; index < ids.length; index++) {
      Groups.push(
        <GroupPreview
          id={ids[index]}
          key={index}
          Group={this.props.Groups.get(ids[index])}
        />
      );
    }

    return (
      <div className={classes.GroupsArea}>
        <div className={classes.Title}>Groups You're In</div>
        <SwipeList>{Groups}</SwipeList>
      </div>
    );
  }
}

export default GroupsArea;
