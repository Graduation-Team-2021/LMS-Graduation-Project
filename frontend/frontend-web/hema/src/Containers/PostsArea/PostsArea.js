import classes from "./PostsArea.module.css";
import React, { Component } from "react";
import PostPreview from "../../Components/PostPreview/PostPreview";
import Card from "../../Components/Card/Card";
import Post from "../../Components/Post/Post";
class PostsArea extends Component {
  state = { Posts: [], dismissed: false, clicked: false };

  constructor() {
    super();
    for (let index = 0; index < 5; index++) {
      this.state.Posts.push({
        Title: `Post ${index + 1}`,
        Desc: "Blah Blah Blah",
      });
    }
  }

  hide = () => {
    this.setState({
      clicked: false,
    });
    this.dismiss();
  };

  show = () => {
    this.setState({
      clicked: true,
    });
  };

  dismiss = () => {
    this.setState(() => {
      return {
        dismissed: true,
      };
    });
    setTimeout(
      () =>
        this.setState((old, props) => {
          let temp = [...old.Posts];
          temp.pop();
          return {
            Posts: temp,
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
          <div
            className={
              classes.front +
              " " +
              (this.state.dismissed ? classes.dismiss : "")
            }
          >
            {this.state.Posts.length !== 0 ? (
              <PostPreview
                Title={this.state.Posts[this.state.Posts.length - 1].Title}
                Desc={this.state.Posts[this.state.Posts.length - 1].Desc}
                dismiss={this.dismiss}
                show={this.show}
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
                <h1>No More Posts</h1>
              </Card>
            )}
          </div>
          <div
            className={this.state.dismissed ? classes.appear : classes.behind}
          >
            {this.state.Posts.length > 1 ? (
              <PostPreview
                Main
                Title={this.state.Posts[this.state.Posts.length - 2].Title}
                Desc={this.state.Posts[this.state.Posts.length - 2].Desc}
                dismiss={this.dismiss}
              />
            ) : this.state.Posts.length !== 0 ||
              (this.state.Posts.length === 0 && this.state.dismissed) ? (
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
                <h1>No More Posts</h1>
              </Card>
            ) : null}
          </div>
        </div>
        {this.state.Posts.length!==0?<Post
          clicked={this.state.clicked}
          hide={this.hide}
          Title={this.state.Posts[this.state.Posts.length - 1].Title}
          Desc={this.state.Posts[this.state.Posts.length - 1].Desc}
        />:null}
      </div>
    );
  }
}

export default PostsArea;
