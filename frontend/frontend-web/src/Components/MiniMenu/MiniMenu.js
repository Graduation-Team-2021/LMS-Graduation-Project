import React, { useState } from "react";
import classes from "./MiniMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faSquare, faHome } from "@fortawesome/free-solid-svg-icons";
import filler from "../../assets/Filler.png";
import DropDownMenu from "../DropDownMenu/DropDownMenu";


const MiniMenu = (props) => {
  const [Notif, setNotif] = useState(false);
  const [Menu, setMenu] = useState(false);
  const [Messages, setMessages] = useState(false);

  return (
    <div className={classes.full}>
      <div className={classes.Main}>
      <div
          className={classes.holder}
          onClick={() => {
            props.history.push('/');
          }}
        >
          <FontAwesomeIcon icon={faHome} size="4x" fixedWidth />
        </div>
        <div
          className={classes.holder}
          onClick={() => {
            setMenu(false);
            setMessages(false);
            setNotif(!Notif);
            props.onNotifClick();
          }}
        >
          {props.notif !== 0 ? (
            <div className={classes.notif}>{props.notif}</div>
          ) : null}
          <FontAwesomeIcon icon={faBell} size="4x" fixedWidth />
        </div>
        <div
          className={classes.holder}
          onClick={() => {
            setMenu(false);
            setNotif(false);
            setMessages(!Messages);
            props.onMessageClick();
          }}
        >
          {props.message !== 0 ? (
            <div className={classes.notif}>{props.message}</div>
          ) : null}
          <FontAwesomeIcon icon={faCommentDots} size="4x" fixedWidth />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            setMessages(false);
            setNotif(false);
            setMenu(!Menu);
          }}
        >
          <div className={classes.holder}>
            <div className={classes.status} />
            <FontAwesomeIcon
              icon={faSquare}
              size="5x"
              fixedWidth
              color="purple"
            />
            <img
              src={filler}
              alt=""
              style={{
                maxWidth: "80%",
                position: "absolute",
                zIndex: "10",
              }}
            />
          </div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div>
        {Notif || Messages || Menu ? (
          <DropDownMenu setLogged={props.setLogged} Notif={props.Notif}
            choice={Notif ? "Notif" : Messages ? "Messages" : "Menu"}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MiniMenu;
