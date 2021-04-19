import React, { Component } from "react";
import ReactPlayer from "react-player";
//import Navbar from '../navbar/Navbar';
import "./Vedio.css";
import { withRouter } from "react-router-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CoursePage from "../Containers/CoursePage/CoursePage";

class Vedioplayer extends Component {
  // axios.get()

  state = {
    url:
      "https://www.youtube.com/watch?v=A3Ffwsnad0k&list=PLl-gb0E4MII28GykmtuBXNUNoej-vY5Rz&index=1",
  };

  mathurl = () => {
    this.setState({
      url:
        // "https://youtu.be/8zuE3Rtm1Eo?list=PLQkyODvJ8ywuGxYwN0BfMSvembIJkNQH1"
        "https://www.youtube.com/watch?v=MZLkCsa1YfE",
    });
    // alert("math");
    console.log(this.state.url);
  };
  Phyurl = () => {
    this.setState({
      url:
        "https://www.youtube.com/watch?v=cJZQczEEWkc",
    });
    // alert("phy");
    console.log(this.state.url);
  };
  compurl = () => {
    this.setState({
      url:
        "https://www.youtube.com/watch?v=u16K5eWI9Rk",
    });
    // alert("comp");
    console.log(this.state.url);
  };
  softwre = () => {
    setTimeout(
      this.setState({
        url:
          "https://www.youtube.com/watch?v=xzjStyEDPM0",
      }),
      3000
    );

    // alert("software");
    console.log(this.state.url);
  };
  nulling = () => {
    console.log(this.props.location.state);
    this.props.history.push({
      pathname: `/Course/${this.props.location.state.Data.CourseID}`,
      state: {
        Data: this.props.location.state.Data,
        isJoined: "true",
      },
    })
  };

  start = () => {
    alert("you can start now your vedio");
  };
  finish = () => {
    alert("you have finished your vedio keeo going");
  };
  change = () => {
    alert("you can start now a new your vedio");
  };
  render() {
    return (
      <div className="container">
        <div className="Vedio">
          <ReactPlayer
            controls
            width="1500px"
            height="600px"
            url={this.state.url}
            onReady={this.start}
            onEnded={this.finish}
            onchange={this.change}
            onError={this.nulling}
          />
          <ul className="vediolist">
            <li>
              <p> Your courses vedio :</p>
            </li>
            <li>
              <p onClick={this.mathurl}> Math</p>
            </li>
            <li>
              <p onClick={this.Phyurl}> Physices</p>
            </li>
            <li>
              <p onClick={this.compurl}> Compliers</p>
            </li>
            <li>
              <p onClick={this.softwre}> Software</p>
            </li>
            <li>
              <p onClick={this.nulling}> Back to courese page</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Vedioplayer);
