import classes from "./GroupsArea.module.css";
import React, { Component } from "react";
import GroupPreview from "../../Components/RecommendedGroup/GroupPreview";
import Card from "../../Components/Card/Card";
class GroupsArea extends Component {
  state = {
    Groups: this.props.Groups,
    dismissed: false,
    ids: Array.from(this.props.Groups.keys()),
    lastid:
      Array.from(this.props.Groups.keys()).length > 0
        ? Array.from(this.props.Groups.keys())[
            Array.from(this.props.Groups.keys()).length - 1
          ]
        : null,
    preLastid:
      Array.from(this.props.Groups.keys()).length > 1
        ? Array.from(this.props.Groups.keys())[
            Array.from(this.props.Groups.keys()).length - 2
          ]
        : null,
  };

  ToJoining = (id) => {
    console.log('Caliing from Recommended Groups')
    this.setState(() => {
      return {
        dismissed: true,
      };
    });
    setTimeout(
      () =>
        this.setState((old, props) => {
          let temp = old.Groups;
          props.Joining(id);
          return {
            Groups: temp,
            dismissed: false,
            lastid:
              Array.from(temp.keys()).length > 0
                ? Array.from(temp.keys())[Array.from(temp.keys()).length - 1]
                : null,
            preLastid:
              Array.from(temp.keys()).length > 1
                ? Array.from(temp.keys())[Array.from(temp.keys()).length - 2]
                : null,
          };
        }),
      500
    );
  }

  dismiss = (id) => {
    this.setState(() => {
      return {
        dismissed: true,
      };
    });
    setTimeout(
      () =>
        this.setState((old, props) => {
          let temp = old.Groups;
          temp.delete(id);
          return {
            Groups: temp,
            dismissed: false,
            lastid:
              Array.from(temp.keys()).length > 0
                ? Array.from(temp.keys())[Array.from(temp.keys()).length - 1]
                : null,
            preLastid:
              Array.from(temp.keys()).length > 1
                ? Array.from(temp.keys())[Array.from(temp.keys()).length - 2]
                : null,
          };
        }),
      500
    );
  };

  render() {
    return (
      <div
        className={classes.Main}
        style={{
          flex: this.props.flex,
        }}
      >
        <div className={classes.Title}>{this.props.Title}</div>
        <div className={classes.holder}>
          {
            <React.Fragment>
              <div
                className={
                  classes.front +
                  " " +
                  (this.state.dismissed ? classes.dismiss : "")
                }
              >
                {this.state.lastid? (
                  <GroupPreview
                  Joining={this.ToJoining.bind(this,this.state.lastid)}
                    id={this.state.lastid}
                    Title={this.state.Groups.get(this.state.lastid).Title}
                    Desc={this.state.Groups.get(this.state.lastid).Desc}
                    dismiss={this.dismiss.bind(this, this.state.lastid)}
                  />
                ) : (
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
                    <h1>No More Groups</h1>
                  </Card>
                )}
              </div>
              <div
                className={
                  this.state.dismissed ? classes.appear : classes.behind
                }
              >
                {this.state.preLastid ? (
                  <GroupPreview
                    id={this.state.preLastid}
                    Title={this.state.Groups.get(this.state.preLastid).Title}
                    Desc={this.state.Groups.get(this.state.preLastid).Desc}
                    dismiss={this.dismiss.bind(this, this.state.preLastid)}
                  />
                ) : this.state.lastid ||
                  (!this.state.lastid && this.state.dismissed) ? (
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
                    <h1>No More Groups</h1>
                  </Card>
                ) : null}
              </div>
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

export default GroupsArea;
