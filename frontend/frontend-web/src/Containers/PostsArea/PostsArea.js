import classes from "./PostsArea.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import PostPreview from "../../Components/PostPreview/PostPreview";
import Post from "../../Components/Post/Post";
import Dismiss from "../../Components/DismissComponent/Dismiss";

import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";

class PostsArea extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = { Posts: this.props.Posts, clicked: false };

  hide = () => {
    this.setState({
      clicked: false,
    });
    this.myRef.current.onDismiss();
  };

  show = () => {
    this.setState({
      clicked: true,
    });
  };

  onDismiss = () =>
    this.setState((old, props) => {
      let temp = [...old.Posts];
      temp.pop();
      return {
        Posts: temp,
      };
    });

  render() {
    const Posts = this.state.Posts.map((value, index) => {
      return <PostPreview key={index} Post={value} show={this.show} />;
    });

    return (
      <div
        className={classes.Main}
        style={{
          flex: this.props.flex,
        }}
      >
        <Post
          clicked={this.state.clicked}
          hide={this.hide}
          Post={this.state.Posts[this.state.Posts.length - 1]}
        />
        <div className={classes.Title}>{this.props.Title}</div>
        <div className={classes.holder}>
          <Dismiss Title="Posts" ref={this.myRef} onDismiss={this.onDismiss}>
            {Posts}
          </Dismiss>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsArea);
