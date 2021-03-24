import classes from "./GroupsArea.module.css";
import React, { Component } from "react";
import GroupPreview from "../../Components/GroupPreview/CoursePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

class GroupsArea extends Component {

  constructor(props) {
    super(props);
    this.GroupsArea = React.createRef();
  }

  render() {
    const Groups = [];
    const ids = Array.from(this.props.Groups.keys())
    for (let index = 0; index < ids.length; index++) {
      Groups.push(
        <GroupPreview
        id={ids[index]}
          key={index}
          Title={this.props.Groups.get(ids[index]).Title}
          Desc={this.props.Groups.get(ids[index]).Desc}
        />
      );
    }

    return (
      <div className={classes.GroupsArea}>
        <div className={classes.Title}>Groups You're In</div>
        <div className={classes.SwipeList}>
          <div
            className={classes.Right}
            onClick={() => {
              this.GroupsArea.current.scrollLeft -= 250;
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="4x" />
          </div>
          <div className={classes.InnerSwipeList} ref={this.GroupsArea}>
            {Groups}
          </div>
          <div
            className={classes.Left}
            onClick={() => {
              this.GroupsArea.current.scrollLeft += 250;
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} size="4x" />
          </div>
        </div>
      </div>
    );
  }
}

export default GroupsArea;
