import React, { Component } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = { value: false };
  }
  changeHandler = (event) => {
    this.setState({ value: event.target.value });
    console.log(
      "from NotificationItem.js changeHandler the new value is " +
        event.target.value
    );
  };
  render() {
    return (
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={this.state.value}
        onChange={this.changeHandler}
        row
      >
        <FormControlLabel
          value="true"
          control={<Radio />}
          label="Pop-Up Notification"
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label="Email Notification"
        />
      </RadioGroup>
    );
  }
}

export default NotificationItem;
