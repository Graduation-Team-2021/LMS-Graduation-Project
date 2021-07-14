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
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import ImageHolder from "../ImageHolder/ImageHolder";
import Button from "../../Components/Button/Button";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import {url} from '../../Interface/Interface'
const MiniMenu = (props) => {
  const [Notif, setNotif] = useState(false);
  const [Menu, setMenu] = useState(false);
  const [Messages, setMessages] = useState(false);
  const [CLicked, setCLicked] = useState(false);

  return (
    <ClickOutside
      onClickOutside={() => {
        console.log("CLICKED");
        setMenu(false);
        setMessages(false);
        setNotif(false);
      }}
    >
      <div className={classes.full}>
        <span className={classes.Main}>
          {props.location.pathname !== "/" ? (
            <Button
              className={classes.holder}
              onClick={() => props.history.goBack()}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className={classes.Icon}
                fixedWidth
              />
            </Button>
          ) : (
            <Button className={classes.holder + " " + classes.hidden}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className={classes.Icon}
                fixedWidth
              />
            </Button>
          )}
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
          {props.userData.Role!=="admin"?<Button
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
          </Button>:null}
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
            <ImageHolder
              className={classes.UserImage}
              filler={props.userData.Pic? props.userData.Pic: filler}
            />
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
          <ClickOutside onClickOutside={() => setCLicked(false)}>
            <span
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "flex-end",
              }}
            >
              <button
                className={classes.dropbtn}
                onClick={() => {
                  console.log(CLicked);
                  setCLicked(!CLicked);
                }}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              {CLicked ? (
                <React.Fragment>
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
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          size="4x"
                          fixedWidth
                        />
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
                            fixedWidth
                            color="purple"
                          />

                          <ImageHolder
                            src={props.userData.Pic || filler}
                            alt=""
                            className={classes.Image}
                          />
                        </div>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
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
                        choice={
                          Notif ? "Notif" : Messages ? "Messages" : "Menu"
                        }
                      />
                    ) : null}
                  </div>
                </React.Fragment>
              ) : null}
            </span>
          </ClickOutside>
        </div>
      </div>
    </ClickOutside>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MiniMenu)
);
