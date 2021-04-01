import classes from "./GroupsArea.module.css";
import React, { Component } from "react";
import OldCourse from "../../Components/OldCourse/GroupPreview";
import Card from "../../Components/Card/Card";
class GroupsArea extends Component {
  state = { Courses: this.props.Courses, dismissed: false };

  dismiss = () => {
    this.setState(() => {
      return {
        dismissed: true,
      };
    });
    setTimeout(
      () =>
        this.setState((old, props) => {
          let temp = [...old.Courses];
          temp.pop();
          return {
            Courses: temp,
            dismissed: false,
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
                {this.state.Courses.length !== 0 ? (
                  <OldCourse
                    Title={
                      this.state.Courses[this.state.Courses.length - 1].Title
                    }
                    dismiss={this.dismiss}
                    grade={this.state.Courses[this.state.Courses.length - 1].grade}
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
                    <h1>No More Courses</h1>
                  </Card>
                )}
              </div>
              <div
                className={
                  this.state.dismissed ? classes.appear : classes.behind
                }
              >
                {this.state.Courses.length > 1 ? (
                  <OldCourse
                    Main
                    Title={
                      this.state.Courses[this.state.Courses.length - 2].Title
                    }
                    Desc={this.state.Courses[this.state.Courses.length - 2].Desc}
                    dismiss={this.dismiss}
                    grade={this.state.Courses[this.state.Courses.length - 2].grade}
                  />
                ) : this.state.Courses.length !== 0 ||
                  (this.state.Courses.length === 0 && this.state.dismissed) ? (
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
                    <h1>No More Courses</h1>
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
