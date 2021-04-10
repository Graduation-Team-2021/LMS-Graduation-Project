import classes from "./TopBar.module.css";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Welcome from "../Welcome/Welcome";
import MiniMenu from "../MiniMenu/MiniMenu";

const TopBar = (props) => {
  useEffect(() => {
    setNotif(2);
  }, []);

  const [notif, setNotif] = useState(2);

  const [message, setMessage] = useState(5);

  return (
    <div className={classes.Main}>
      <Welcome Name={props.Name} />
      <Search />
      <div style={{
        width: '40vw'
      }}>
        <MiniMenu
          TokenError={props.TokenError}
          id={props.id}
          notif={notif}
          Notif={props.Notif}
          onNotifClick={() => {
            setNotif(0);
          }}
          message={message}
          onMessageClick={() => {
            setMessage(0);
          }}
        />
      </div>
    </div>
  );
};

export default TopBar;
