import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../Components/Button/Button";
import GroupPreview from "../../Components/GroupPreview/CoursePreview";
import SwipeList from "../../Components/SwipeList/SwipeList";
import classes from "./GroupsArea.module.css";
import Waiting from "../../Components/Waiting/Waiting";

import { getCurrentGroups } from "../../Interface/Interface";
import { setGroup } from "../../Models/Group";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import axios from "axios";

class GroupsArea extends Component {
  state = {
    Groups: [],
    Loading: true,
  };

  Token = this.props.userData.Token;
  TokenError = this.props.userDataActions.tokenError;
  Joined = this.props.currentGroups.currentGroups;
  setJoined = this.props.currentGroupsActions.onSetCurrentGroups;
  cancel = axios.CancelToken.source();
  CurrentGroups = this.props.currentGroups.currentGroups;
  setCurrentGroups = this.props.currentGroupsActions.onSetCurrentGroups;

  componentDidMount() {
    getCurrentGroups(this.Token, this.cancel)
      .then((res) => {
        const Groups = new Map();
        if (res) {
          res.forEach((element) => {
            Groups.set(element["group_id"], setGroup(element));
          });
          this.setState({ Groups: Groups });
          this.setCurrentGroups(Groups);
        } else {
          this.TokenError();
        }
        this.setState({
          Loading: false,
        });
      });
  }

  loadGroups = () =>{
    this.props.history.push("/Groups");
  }

  render() {
    let ids = Array.from(this.state.Groups.keys());
    let Groups = [];

    for (let index = 0; index < ids.length; index++) {
      Groups.push(
        <GroupPreview
          id={ids[index]}
          key={index}
          Group={this.state.Groups.get(ids[index])}
        />
      );
    }

    return (
      <div className={classes.GroupsArea}>
        <div className={classes.Title}>
          <div>Groups You're In</div>
          <div className={classes.Container}>
            <Button
              className={classes.Join}
              onClick={() => {
                this.loadGroups();
              }}
            >
              See All Groups
            </Button>
          </div>
        </div>
        <Waiting Loading={this.state.Loading}>
          <SwipeList>{Groups}</SwipeList>
        </Waiting>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupsArea)
);
