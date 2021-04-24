import classes from "./PostsArea.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import PostPreview from "../../Components/PostPreview/PostPreview";
import Post from "../../Containers/Post/Post";
import Dismiss from "../../Components/DismissComponent/Dismiss";
import Modal from "../../Components/Modal/Modal";
import Waiting from "../../Components/Waiting/Waiting";

import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";

class PostsArea extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = { Posts: [], clicked: false, Loading: true };
  Token = this.props.userData.Token;
  TokenError = this.props.userDataActions.TokenError;
  ID = this.props.userData.ID;

  componentDidMount() {
    this.props.LoadingPosts(this.Token, this.ID).then((res) => {
      const Posts = [];
      if (res) {
        res.forEach((ele) => {
          Posts.push(this.props.setPost(ele, this.ID));
        });
        this.setState({
          Posts: Posts,
        });
        if (this.props.setPosts) {
          this.props.setPosts(Posts);
        }
      } else {
        this.TokenError();
      }
      this.setState({
        Loading: false,
      });
    });
  }

  onDismiss = () => {
    this.setState((old, props) => {
      let temp = [...old.Posts];
      temp.pop();
      return {
        Posts: temp,
      };
    });
  };

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

  render() {
    const Posts = this.state.Posts.map((value, index) => {
      return <PostPreview key={index} Post={value} show={this.show} />;
    });

    return (
      <div className={classes.Main}>
        {this.state.Posts.length !== 0 ? (
          <Modal show={this.state.clicked} onClick={this.hide}>
            <Post {...this.state.Posts[this.state.Posts.length - 1]} />
          </Modal>
        ) : null}
        <div className={classes.Title}>{this.props.Title}</div>
        <div className={classes.holder}>
          <Waiting Loading={this.state.Loading} Title={this.props.Title}>
            <Dismiss Title="Posts" ref={this.myRef} onDismiss={this.onDismiss}>
              {Posts}
            </Dismiss>
          </Waiting>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsArea);
