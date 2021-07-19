import React from "react";

import classes from "./DropDown.module.css";
import Card from "../Card/Card";
import InMenu from "./Menu/Menu";
import InNotif from "./Notif/Notif";
import InMessages from "./Messages/Messages";

const DropDownMenu = (props) => {

  const Menu = (
    <span className={classes.holder}>
      <Card className={classes.Card} shadow key={1}>
        <InMenu onClick={props.onClick} />
      </Card>
    </span>
  );

  const Notif = (
    <span className={classes.holder}>
      <Card className={classes.Card} shadow key={2}>
        <InNotif onClick={props.onClick} />
      </Card>
    </span>
  );

  const Messages = (
    <span className={classes.holder}>
      <Card shadow key={3} className={classes.Card}>
        <InMessages onClick={props.onClick} setMess={props.setMess} />
      </Card>
    </span>
  );

  return props.choice === "Notif"
    ? Notif
    : props.choice === "Messages"
    ? Messages
    : props.choice === "Menu"
    ? Menu
    : null;
};

export default DropDownMenu;
