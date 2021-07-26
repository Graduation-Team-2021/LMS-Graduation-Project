import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Welcome from "../Welcome/Welcome";
import MiniMenu from "../MiniMenu/MiniMenu";
import classes from "./TopBar.module.css";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { getAllConversations } from "../../Interface/Interface";

const TopBar = (props) => {
  useEffect(() => {
    setNotif(props.recentUserPosts.userRecentPosts.length);
    getAllConversations(props.userData.Token).then((res) => {
      setMessage(res.length);
    });
  }, [props.recentUserPosts.userRecentPosts.length, props.userData.Token]);

  //TODO: Think about how to add only new notifications

  const [notif, setNotif] = useState(0);

  const [message, setMessage] = useState(0);

  return (
    <div className={classes.Main}>
      <Welcome Name={props.Name} />
      <MiniMenu
        TokenError={props.TokenError}
        id={props.id}
        notif={notif}
        onNotifClick={() => {
          setNotif(0);
        }}
        message={message}
        setMessage={setMessage}
        onMessageClick={() => {
          setMessage(0);
        }}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
