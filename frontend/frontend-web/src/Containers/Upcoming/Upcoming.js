import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Upcoming.module.css";
import Minibar from "../../Components/Minibar/Minibar";
import {
  faCalendarAlt,
  faClock,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import CircularArray from "../../Components/CircularArray/CircularArray";
import Waiting from "../../Components/Waiting/Waiting";

import { getRecentEvent } from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setEvent } from "../../Models/Event";

class Upcoming extends Component {
  state = { Event: null, Loading: true, exists: true };

  Token = this.props.userData.Token;
  ID = this.props.userData.ID;
  TokenError = this.props.userDataActions.tokenError;
  setRecentEvent = this.props.recentEventsActions.onSetRecentEvents;

  componentDidMount() {
    getRecentEvent(this.Token, this.ID)
      .then((res2) => {
        if (res2) {
          const res = res2["event"];
          this.setState({
            Loading: false,
          });
          if (res2.status_code === 200) {
            this.setState({
              Event: setEvent(res),
            });
            this.setRecentEvent(setEvent(res));
          } else {
            this.setState({
              exists: false,
            });
          }
        } else {
          this.TokenError();
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state);
    return (
      <div className={classes.upcoming}>
        <Waiting Loading={this.state.Loading}>
          {this.state.Event && this.state.exists ? (
            <React.Fragment>
              <div className={classes.Title}>Upcoming Event</div>
              <div className={classes.EventTitle}>{this.state.Event.Title}</div>
              <div className={classes.Host}>
                Hosted By:
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {this.state.Event.Host}
                </span>
              </div>
              <div className={classes.Invited}>Invited Members</div>
              <CircularArray />
              <Minibar
                icon={faCalendarAlt}
                color="red"
                info={this.state.Event.Date}
              />
              <Minibar
                icon={faClock}
                color="purple"
                info={this.state.Event.Time}
              />
              <Minibar icon={faVideo} color=" rgb(0, 102, 255)" info="Method" />
              <div className={classes.DesTitle}>
                Event Type: {this.state.Event.Type}
              </div>
              <div className={classes.Des}>{this.state.Event.Desc}</div>
            </React.Fragment>
          ) : (
            <h1>No Upcoming Events</h1>
          )}
        </Waiting>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upcoming);
