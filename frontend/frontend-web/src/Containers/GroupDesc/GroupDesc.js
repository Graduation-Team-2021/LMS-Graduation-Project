import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import classes from "./GroupDesc.module.css";

class GroupDesc extends Component {
  render() {
    return (
      <div className={classes.Main}>
        <div className={classes.Title}>About</div>
        <div className={classes.Desc}>{this.props.desc}</div>
      </div>
    );
  }
}

export default withRouter(GroupDesc);
