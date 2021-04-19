import React, { Component } from "react";

import Card from "../Card/Card";

import classes from "./Dismiss.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

class Dismiss extends Component {
  state = {
    Dismissed: false,
    List: this.props.children,
  };

  onDismiss = () => {
    this.setState({
      Dismissed: true,
    });
    setTimeout(() => {
      let temp = [...this.state.List];
      temp.pop();
      this.props.onDismiss();
      this.setState({
        List: temp,
        Dismissed: false,
      });
    }, 500);
  };

  Top = this.state.List[this.state.List.length - 1];

  render() {
    let Main = (
      <Card
        style={{
          border: "2px solid purple",
          padding: "0",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <h1>No More {this.props.Title}</h1>
      </Card>
    );

    if (this.state.List.length !== 0)
      Main = (
        <React.Fragment>
          {this.state.List[this.state.List.length - 1]}
          <div onClick={this.onDismiss} className={classes.dismissButton}>
            <FontAwesomeIcon icon={faTimesCircle} size="4x" />
          </div>
        </React.Fragment>
      );

    let Back = null;
    if (this.state.List.length > 1) {
      Back = (
        <React.Fragment>
          {this.state.List[this.state.List.length - 2]}
          <div onClick={this.onDismiss} className={classes.dismissButton}>
            <FontAwesomeIcon icon={faTimesCircle} size="4x" />
          </div>
        </React.Fragment>
      );
    } else if (
      this.state.List.length !== 0 ||
      (this.state.List.length === 0 && this.state.Dismissed)
    ) {
      Back = (
        <Card
          style={{
            border: "2px solid purple",
            padding: "0",
            overflow: "hidden",
            height: "100%",
            zIndex: "10",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <h1>No More {this.props.Title}</h1>
        </Card>
      );
    }
    /* Card
            style={{
              padding: "5% 0",
              border: "2px solid purple",
              overflow: "hidden",
              zIndex: "10",
              height: "100%",
              position: "relative",
            }} */
    let Back2 = null;
    if (this.state.Dismissed) {
      if (this.state.List.length > 2) {
        Back2 = (
          <React.Fragment>
            {this.state.List[this.state.List.length - 3]}
            <div onClick={this.onDismiss} className={classes.dismissButton}>
              <FontAwesomeIcon icon={faTimesCircle} size="4x" />
            </div>
          </React.Fragment>
        );
      } else if (
        this.state.List.length !== 1 ||
        (this.state.List.length === 1 && !this.state.Dismissed)
      ) {
        Back2 = (
          <Card
            style={{
              border: "2px solid purple",
              padding: "0",
              overflow: "hidden",
              height: "100%",
              zIndex: "10",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <h1>No More {this.props.Title}</h1>
          </Card>
        );
      }
    }

    return (
      <div className={classes.holder}>
        <div
          className={
            classes.front + " " + (this.state.Dismissed ? classes.dismiss : "")
          }
        >
          {Main}
        </div>
        <div className={this.state.Dismissed ? classes.appear : classes.behind}>
          {Back}
        </div>
        <div
          className={
            this.state.Dismissed ? classes.otherappear : classes.otherbehind
          }
        >
          {Back2}
        </div>
      </div>
    );
  }
}

export default Dismiss;
