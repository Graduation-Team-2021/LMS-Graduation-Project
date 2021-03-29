import React, { Component } from "react";
import classes from "./Upcoming.module.css";
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar";
import CircularNumber from "../../Components/CircularNumber/CircularAvatar";
import filler from "../../assets/Filler.png";
import Minibar from "../../Components/Minibar/Minibar";
import {
  faCalendarAlt,
  faClock,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

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
    const Event = this.props.Event

    return (
      <div className={classes.upcoming}>
    {/*TODO: Add Add Event Button Here*/}
        <div className={classes.Title}>Upcoming Event</div>
        <div className={classes.EventTitle}>
          {Event.Title}
        </div>
        <div className={classes.Host}>
          Hosted By:
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {Event.Host}
          </span>
        </div>
        <div className={classes.Invited}>Invited Members</div>
        <div className={classes.Joined}>{Joined}</div>
        <Minibar icon={faCalendarAlt} color="red" info={Event.Date}/>
        <Minibar icon={faClock} color="purple" info={Event.Time}/>
        <Minibar icon={faVideo} color=" rgb(0, 102, 255)" info="Method" />
        <div className={classes.DesTitle}>Event Type: {Event.Type}</div>
        <div className={classes.Des}>
          {Event.Desc}
        </div>
      </div>
    );
  }
}

export default Upcoming;
