import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./SwipeList.module.css";

class SwipeList extends Component {
  state = {
    overflowActive: false,
  };

  constructor(props) {
    super(props);
    this.GroupsArea = React.createRef();
  }

  isEllipsisActive(e) {
    return e.offsetWidth < e.scrollWidth;
  }

  componentDidMount() {
    this.setState({
      overflowActive: this.isEllipsisActive(this.GroupsArea.current),
    });
  }

  render() {
    return (
      <div className={classes.SwipeList}>
        {this.state.overflowActive ? (
          <div
            className={classes.Right}
            onClick={() => {
              this.GroupsArea.current.scrollLeft -= 250;
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        ) : null}
        <div
          className={
            classes.InnerSwipeList +
            (!this.state.overflowActive ? "" : " " + classes.overFlow)
          }
          ref={this.GroupsArea}
        >
          {this.props.children}
        </div>
        {this.state.overflowActive ? (
          <div
            className={classes.Left}
            onClick={() => {
              this.GroupsArea.current.scrollLeft += 250;
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SwipeList;
