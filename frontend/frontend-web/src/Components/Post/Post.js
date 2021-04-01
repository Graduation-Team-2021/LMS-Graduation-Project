import React, { Component } from "react";
import Modal from "../Modal/Modal";
class Post extends Component {

  render() {
    const Post = (
      <div>
        <h1>{this.props.Title}</h1>
        <div>{this.props.Desc}</div>
      </div>
    );

    return (
      <Modal show={this.props.clicked} onClick={this.props.hide}>
        {Post}
      </Modal>
    );
  }
}

export default Post;
