import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import classes from "./GroupDesc.module.css";
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar";
import CircularNumber from "../../Components/CircularNumber/CircularNumber";
import filler from "../../assets/Filler.png";

class GroupDesc extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let Joined = [];

    const Number = 21;

    for (let index = 0; index < (Number <= 6 ? Number : 5); index++) {
      Joined.push(
        <div
          key={index}
          className={classes.Circle}
          style={{
            transform: `translateX(${(-index - (Number > 4 ? 1 : 0)) * 20}px)`,
          }}
        >
          <CircularAvatar filler={filler} />
        </div>
      );
    }

    if (Number > 6) {
      Joined.push(
        <div key={6} className={classes.Circle}>
          <CircularNumber
            filler={"+" + (Number - 5 <= 999 ? Number - 5 : 999)}
          />
        </div>
      );
    }

    return (
      <div className={classes.Main}>
        <div className={classes.Title}>About</div>
        <div className={classes.Desc}>{this.props.desc}</div>
        <div className={classes.Invited}>Joined Members</div>
        <div className={classes.Joined}>{Joined}</div>
      </div>
    );
  }
}

export default withRouter(GroupDesc);
