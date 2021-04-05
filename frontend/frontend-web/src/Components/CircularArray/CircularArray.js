import React, { Component } from "react";

import CircularAvatar from "./CircularAvatar/CircularAvatar";
import CircularNumber from "./CircularNumber/CircularNumber";
import filler from "../../assets/Filler.png";

class CircularArray extends Component {
  //This is how to programmatically do Responsive Web site
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
    window.addEventListener("resize", this.handleResize);
  }

  render() {
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

    console.log(this.state.windowWidth);

    for (
      let index = 0;
      index < (Number <= shift ? Number : shift - 1);
      index++
    ) {
      Joined.push(
        <div
          key={index}
          style={{
            transform: `translateX(${
              index !== 0
                ? `${(-index + 1 - (Number > shift - 2 ? 1 : 0)) * 3}vh`
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
            transform: `translateX(${-(shift - 1) * 3}vh)`,
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
          border: "1px solid blue",
          display: "flex",
          width: `${Joined.length * 7 - shift * 3 + 3}vh`,
        }}
      >
        {Joined}
      </div>
    );
  }
}

export default CircularArray;
