import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import classes from "./GroupDesc.module.css";
import CircularArray from "../../Components/CircularArray/CircularArray";

class GroupDesc extends Component {
  render() {
    return (
      <div className={classes.Main}>
        <div className={classes.Title}>About</div>
        <div className={classes.Desc}>{this.props.desc}</div>
        <div className={classes.Invited}>Joined Members</div>
        <div className={classes.Joined}>
          <CircularArray />
        </div>
      </div>
    );
  }
}

export default withRouter(GroupDesc);
