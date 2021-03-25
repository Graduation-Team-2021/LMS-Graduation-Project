import React, { Component } from "react";
import { Button } from "@material-ui/core";
import NotificationItem from "./NotificationItem/NotificationItem";

import classes from "./Notifications.module.css";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [false],
    };
  }
  addNotificationHandler = () => {
    let currentNotification = this.state.notification;
    currentNotification.push(false);
    this.setState({ notification: currentNotification });
  };
  render() {
    let notification = this.state.notification.map((element, index) => {
      return <NotificationItem key={index} />;
    });
    //TODO: Dont forget to extract out the styling to CSS file
    return (
      <div className={classes.NotificationContainer}>
        <div style={{display: 'flex', flexDirection:'row',alignItems: 'center',margin: '10px'}}>
            <subtitle>Notifications: </subtitle>
          <div style={{display: 'flex', flexDirection:'column'}}>{notification}</div>
        </div>
        <Button color="primary" onClick={this.addNotificationHandler}>
          + ADD NOTIFICATION
        </Button>
      </div>
    );
  }
}

export default Notifications;
