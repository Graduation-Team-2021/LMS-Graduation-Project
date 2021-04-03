import React from "react";
import Card from "../Card/Card";
import InMenu from'./Menu/Menu';
import InNotif from'./Notif/Notif';
import InMessages from'./Messages/Messages';

const DropDownMenu = (props) => {
  const Menu = (
    <Card
    shadow
    key={1}
      style={{
        padding: "0",
        maxHeight: "40vh",
        overflow: "auto",
        border: "1px solid black",
      }}
    >
    <InMenu setLogged={props.setLogged} TokenError={props.TokenError}/>
    </Card>
  );

  const Notif = (
    <Card
    shadow
    key={2}
      style={{
        padding: "0",
        maxHeight: "40vh",
        overflow: "auto",
        border: "1px solid black",
      }}
    >
    <InNotif Notif={props.Notif}/>
    </Card>
  );

  const Messages = (
    <Card
    shadow
    key={3}
      style={{
        padding: "0",
        maxHeight: "40vh",
        overflow: "auto",
        border: "1px solid black",
      }}
    >
    <InMessages/>
    </Card>
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
