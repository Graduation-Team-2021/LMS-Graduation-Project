import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Search from "../Search/Search";
import Welcome from "../Welcome/Welcome";
import MiniMenu from "../MiniMenu/MiniMenu";
import classes from "./TopBar.module.css";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

const TopBar = (props) => {
  useEffect(() => {
    setNotif(props.recentUserPosts.userRecentPosts.length);
  }, [props.recentUserPosts.userRecentPosts.length]);

  //TODO: Think about how to add only new notifications

  const [notif, setNotif] = useState(0);

  const [message, setMessage] = useState(5);

  return (
    <div className={classes.Main}>
      <Welcome Name={props.Name} />
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
