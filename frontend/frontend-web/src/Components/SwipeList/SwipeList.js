import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./SwipeList.module.css";
import Button from "../Button/Button";

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
    window.addEventListener("resize", this.handleResize);
    this.setState({
      overflowActive: this.isEllipsisActive(this.GroupsArea.current),
    });
  }

  handleResize = (e) => {
    this.setState({ overflowActive: this.isEllipsisActive(this.GroupsArea.current), });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div className={classes.SwipeList}>
        {this.state.overflowActive ? (
          <span className={classes.Right}>
            <Button
              className={classes.Button}
              onClick={() => {
                this.GroupsArea.current.scrollLeft -= 250;
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
          </span>
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
          <span className={classes.Left}>
            <Button
              className={classes.Button}
              onClick={() => {
                this.GroupsArea.current.scrollLeft += 250;
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </span>
        ) : null}
      </div>
    );
  }
}

export default SwipeList;
