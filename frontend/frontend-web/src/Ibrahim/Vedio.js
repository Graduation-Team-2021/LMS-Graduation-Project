import React, { Component } from "react";
import ReactPlayer from "react-player";
import Card from "../Components/Card/Card";
import classes from "./Vedio.module.css";
import Button from "../Components/Button/Button";
import { withRouter } from "react-router-dom";
import { getVideos, url, getOneVideo } from "../Interface/Interface";

class Vedioplayer extends Component {
  state = {
    url: null,
    windowWidth: window.innerWidth - 100,
    list: [],
    ready: false,
  };
  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth - 50 });
  };
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    getVideos(this.props.match.params.id).then((res) => {
      const l = [];
      res.forEach((value, index) => {
        l.push(
          <span className={classes.holder}>
            <Button
              className={classes.Button}
              key={index}
              onClick={() => this.loadVideo(value["material_id"])}
            >
              {value["material_name"]}
            </Button>
          </span>
        );
      });
      this.setState({ list: l });
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  loadVideo = (id) => {
    getOneVideo(id).then((res) => {
      console.log(res);
      this.setState({ url: url + res });
    });
  };

  nulling = () => {
    console.log(this.props.location.state);
    this.props.history.push({
      pathname: `/Course/${this.props.location.state.Data.CourseID}`,
      state: {
        Data: this.props.location.state.Data,
        isJoined: "true",
      },
    });
  };

  render() {
    return (
      <div className={classes.container}>
        <Card shadow className={classes.Card}>
          <div className={classes.Vedio}>
            {console.log(this.state.url)}
            {this.state.url ? (
              <ReactPlayer
                controls
                width={this.state.windowWidth}
                height="100%"
                url={this.state.url}
                onError={this.nulling}
              />
            ) : (
              <Card shadow>Please Choose A Video from The List</Card>
            )}
            {/* <ReactPlayer
            controls
            width="1500px"
            height="600px"
            url={this.state.url}
            onReady={this.start}
            onEnded={this.finish}
            onchange={this.change}
            onError={this.nulling}
          /> */}

            <div className={classes.vediolist}>
              <p>Your Course Videos</p>
              {/* <li>
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
              </li> */}
              <div className={classes.list}>
                {[
                  ...this.state.list,
                  <span className={classes.holder}>
                    <Button
                      className={classes.Button}
                      onClick={() =>
                        this.setState({
                          url:
                            "https://www.youtube.com/watch?v=9PyOlQ-1y6g&list=PLo62-7UV0K9OFD7GQAcR2TUAFd2TlinjR&index=2",
                        })
                      }
                    >
                      {"Testing....."}
                    </Button>
                  </span>,
                ]}
              </div>
              <span
                style={{
                  padding: "5% 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button className={classes.Back} onClick={this.nulling}>
                  Back to Course page
                </Button>
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(Vedioplayer);
