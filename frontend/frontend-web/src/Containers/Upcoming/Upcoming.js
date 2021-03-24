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

    return (
      <div className={classes.upcoming}>
    {/*TODO: Add Add Event Button Here*/}
        <div className={classes.Title}>Upcoming Event</div>
        <div className={classes.EventTitle}>
          This Paragraph is for the Title of the Upcoming Event
        </div>
        <div className={classes.Host}>
          Hosted By:{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {this.props.Host}
          </span>
        </div>
        <div className={classes.Invited}>Invited Members</div>
        <div className={classes.Joined}>{Joined}</div>
        <Minibar icon={faCalendarAlt} color="red" info="Date" />
        <Minibar icon={faClock} color="purple" info="Time" />
        <Minibar icon={faVideo} color=" rgb(0, 102, 255)" info="Method" />
        <div className={classes.DesTitle}>Description</div>
        <div className={classes.Des}>
          sadasnlasmimas; lmfasmd; asmfas;dm;asmd ;asf;kasmd;mas; ldma;slmd;.as md;oas m;d.mas dmas;mf;asmf;lasmf;asmd;asmp
        </div>
      </div>
    );
  }
}

export default Upcoming;
