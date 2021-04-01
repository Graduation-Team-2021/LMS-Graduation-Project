import React, { Component } from "react";
import classes from "./GroupDesc.module.css";
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar";
import CircularNumber from "../../Components/CircularNumber/CircularAvatar";
import filler from "../../assets/Filler.png";
import {withRouter} from 'react-router-dom';

class Upcoming extends Component {
  render() {
    let Joined = [];

    const Number = 21;

    if (Number > 6) {
      Joined.push(
        <div
          key={0}
          className={classes.Circle}
          style={{
            zIndex: Number,
          }}
        >
          <CircularNumber
            filler={"+" + (Number - 5 <= 999 ? Number - 5 : 999)}
          />
        </div>
      );
    }

    for (let index = 0; index < (Number <= 6 ? Number : 5); index++) {
      Joined.push(
        <div
          key={index + 1}
          className={classes.Circle}
          style={{
            zIndex: Number - index - (Number > 6 ? 1 : 0),
            transform:
              "translateX(" + (-index - (Number > 4 ? 1 : 0)) * 40 + "px)",
          }}
        >
          <CircularAvatar filler={filler} />
        </div>
      );
    }

    return (
      <div className={classes.upcoming}>
        <div className={classes.Title}>About</div>
        <div className={classes.EventTitle}>{this.props.desc}</div>
      </div>
    );
  }
}

export default withRouter(Upcoming);
