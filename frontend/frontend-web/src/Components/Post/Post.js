import React, { Component } from "react";
import Modal from "../Modal/Modal";
import Post from "../../Containers/Post/Post";
class PopupPost extends Component {
  render() {
    return (
      <Modal show={this.props.clicked} onClick={this.props.hide}>
        <Post {...this.props.Post}/>
      </Modal>
    );
  }
}

export default PopupPost;
