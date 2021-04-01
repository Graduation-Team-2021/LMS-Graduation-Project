import classes from "./GroupsArea.module.css";
import React, { Component } from "react";
import GroupPreview from "../../Components/GroupPreview/CoursePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

class GroupsArea extends Component {
  
  state={
    overflowActive: false,
  }

  constructor(props) {
    super(props);
    this.GroupsArea = React.createRef();
  }

  isEllipsisActive(e) {
    return e.offsetWidth < e.scrollWidth;
  }

  componentDidMount() {
    this.setState({ overflowActive: this.isEllipsisActive(this.GroupsArea.current) });
  }

  render() {
    let ids = Array.from(this.props.Groups.keys())
    let Groups = [];
    for (let index = 0; index < ids.length; index++) {
      Groups.push(
        <GroupPreview
        id={ids[index]}
          key={index}
          Group={this.props.Groups.get(ids[index])}
        />
      );
    }

    return (
      <div className={classes.GroupsArea}>
        <div className={classes.Title}>Groups You're In</div>
        <div className={classes.SwipeList}>
          {this.state.overflowActive?<div
            className={classes.Right}
            onClick={() => {
              this.GroupsArea.current.scrollLeft -= 250;
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="4x" />
          </div>:null}
          <div className={classes.InnerSwipeList+(!this.state.overflowActive?'':' '+classes.overFlow)} ref={this.GroupsArea}>
            {Groups}
          </div>
          {this.state.overflowActive?<div
            className={classes.Left}
            onClick={() => {
              this.GroupsArea.current.scrollLeft += 250;
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} size="4x" />
          </div>:null}
        </div>
      </div>
    );
  }
}

export default GroupsArea;
