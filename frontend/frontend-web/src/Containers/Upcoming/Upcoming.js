import React, { Component } from "react";
import classes from "./Upcoming.module.css";
import Minibar from "../../Components/Minibar/Minibar";
import {
  faCalendarAlt,
  faClock,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import CircularArray from "../../Components/CircularArray/CircularArray";

class Upcoming extends Component {
  render() {
    const Event = this.props.Event;

    return (
      <div className={classes.upcoming}>
        {/*TODO: Add "Add Event" Button Here*/}
        <div className={classes.Title}>Upcoming Event</div>
        <div className={classes.EventTitle}>{Event.Title}</div>
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
        <CircularArray />
        <Minibar icon={faCalendarAlt} color="red" info={Event.Date} />
        <Minibar icon={faClock} color="purple" info={Event.Time} />
        <Minibar icon={faVideo} color=" rgb(0, 102, 255)" info="Method" />
        <div className={classes.DesTitle}>Event Type: {Event.Type}</div>
        <div className={classes.Des}>{Event.Desc}</div>
      </div>
    );
  }
}

export default Upcoming;
