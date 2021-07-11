import React, { useState } from "react";
import classes from "./MiniMenu.module.css";
import filler from "../../assets/Filler.png";

import ClickOutside from "react-click-outside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faSquare,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";

import DropDownMenu from "../DropDownMenu/DropDownMenu";
import ImageHolder from "../ImageHolder/ImageHolder";
import Button from "../../Components/Button/Button";

const MiniMenu = (props) => {
  const [Notif, setNotif] = useState(false);
  const [Menu, setMenu] = useState(false);
  const [Messages, setMessages] = useState(false);
  const [CLicked, setCLicked] = useState(false);

  return (
    <ClickOutside
      onClickOutside={() => {
        setMenu(false);
        setMessages(false);
        setNotif(false);
      }}
    >
      <div className={classes.full}>
        <span className={classes.Main}>
          <Button
            className={classes.holder}
            onClick={() => {
              setMenu(false);
              setMessages(false);
              setNotif(false);
              props.history.push("/");
            }}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={classes.Icon}
              fixedWidth
            />
          </Button>
          <Button
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
            <FontAwesomeIcon
              icon={faBell}
              className={classes.Icon}
              fixedWidth
            />
          </Button>
          <Button
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
            <FontAwesomeIcon
              icon={faCommentDots}
              className={classes.Icon}
              fixedWidth
            />
          </Button>
          <Button
            className={classes.holder}
            onClick={() => {
              setMessages(false);
              setNotif(false);
              setMenu(!Menu);
            }}
          >
            <div className={classes.status} />
            <div className={classes.Back} />
            <ImageHolder className={classes.UserImage} filler={filler} />
          </Button>
        </span>
        <div className={classes.large}>
          {Notif || Messages || Menu ? (
            <DropDownMenu
              onClick={() => {
                setMenu(false);
                setMessages(false);
                setNotif(false);
              }}
              TokenError={props.TokenError}
              Notif={props.Notif}
              choice={Notif ? "Notif" : Messages ? "Messages" : "Menu"}
            />
          ) : null}
        </div>
        <div className={classes.drowpdown}>
          <button
            className={classes.dropbtn}
            onClick={() => setCLicked(!CLicked)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className={classes.dropdown_content}>
            <div className={classes.Main2}>
              <div
                className={classes.holder}
                onClick={() => {
                  setMenu(false);
                  setMessages(false);
                  setNotif(false);
                  props.history.push("/");
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
                  <FontAwesomeIcon icon={faSquare} fixedWidth color="purple" />
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
            <div className={classes.small}>
              {Notif || Messages || Menu ? (
                <DropDownMenu
                  onClick={() => {
                    setMenu(false);
                    setMessages(false);
                    setNotif(false);
                  }}
                  TokenError={props.TokenError}
                  Notif={props.Notif}
                  choice={Notif ? "Notif" : Messages ? "Messages" : "Menu"}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ClickOutside>
  );
};

export default withRouter(MiniMenu);
