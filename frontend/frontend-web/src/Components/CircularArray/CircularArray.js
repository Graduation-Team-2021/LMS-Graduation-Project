import React, { Component } from "react";

import CircularAvatar from "./CircularAvatar/CircularAvatar";
import CircularNumber from "./CircularNumber/CircularNumber";
import filler from "../../assets/Filler.png";

class CircularArray extends Component {
  //TODO: This is how to programmatically do Responsive Web site
  constructor(props) {
    super(props);
    this.state = { windowWidth: window.innerWidth };
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const distance = this.props.distance || 20;

    let Joined = [];

    const Number = 21;
    //This is how to programmatically do Responsive Web site

    const shift =
      this.state.windowWidth > 1445
        ? 7
        : this.state.windowWidth > 1100
        ? 5
        : this.state.windowWidth > 750
        ? 4
        : 2;

    for (
      let index = 0;
      index < (Number <= shift ? Number : shift - 1);
      index++
    ) {
      Joined.push(
        <div
          key={index}
          style={{
            zIndex: -index + (Number <= shift ? Number : shift - 1),
            transform: `translateX(${
              index !== 0
                ? `${(-index + 1 - (Number > shift - 2 ? 1 : 0)) * distance}px`
                : 0
            })`,
          }}
        >
          <CircularAvatar filler={filler} />
        </div>
      );
    }

    if (Number > shift) {
      Joined.push(
        <div
          key={6}
          style={{
            zIndex: 0,
            transform: `translateX(${-(shift - 1) * distance}px)`,
          }}
        >
          <CircularNumber
            filler={
              "+" + (Number - (shift - 1) <= 999 ? Number - (shift - 1) : 999)
            }
          />
        </div>
      );
    }

    return (
      <div
        style={{
          padding: "0 0 5%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${Joined.length * 60 - shift * distance + distance}px`,
          }}
        >
          {Joined}
        </div>
      </div>
    );
  }
}

export default CircularArray;
