import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as base,
  faCommentAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as liked } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import Card from "../../Components/Card/Card";
import classes from "./Post.module.css";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { Like, UnLike, Comment } from "../../Interface/Interface";

const Post = (props) => {
  const [likeButtonColor, setLikeButtonColor] = useState(!props.isLiked);
  const [postComments, setPostComments] = useState(props.Comments);
  const [currentTypingComment, setCurrentTypingComment] = useState("");

  let onTypingComment = (event) => {
    setCurrentTypingComment(event.target.value);
  };
  const commentPressHandler = async () => {
    if (currentTypingComment === "") {
      console.log("empty comment");
      alert("this is an empty comment");
      return;
    }
    let temp = {
      comment: currentTypingComment,
      commenter_name: props.userData.Name,
      commenter_id: props.userData.ID,
    };
    //Todo: set comments
    await Comment(props.userData.Token, props.userData.ID, props.PostId,currentTypingComment)
    setPostComments([...postComments, temp]);
    setCurrentTypingComment("");
  };

  const likePressHandler = async () => {
    if (likeButtonColor) {
      await Like(props.userData.Token, props.userData.ID, props.PostId)
    }else{
      await UnLike(props.userData.Token, props.userData.ID, props.PostId)
    }
    setLikeButtonColor((value) => !value);
    // TODO: set liked in the database (send the request)
  };

  let comments = postComments.map((e, i) => (
    <li
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px 10px 10px 0",
        fontFamily: "cursive",
      }}
      key={i}
    >
      {`${e["commenter_name"]}: ${e["comment"]}`}{" "}
    </li>
  ));
  //  TODO : set comments from database

  return (
    <span className={classes.Temp}>
      <Card className={classes.PostHolder} shadow>
        <h2>{props.Title}</h2>
        <p>{props.Desc}</p>
        <div className={classes.BottomHalf}>
          <div className={classes.ButtonArea}>
            <button onClick={likePressHandler} className={classes.Button}>
              {likeButtonColor ? (
                <FontAwesomeIcon icon={base} />
              ) : (
                <FontAwesomeIcon icon={liked} color="blue" />
              )}
              <label className={likeButtonColor ? classes.black : classes.blue}>
                Like
              </label>
            </button>
            <button onClick={commentPressHandler} className={classes.Button}>
              <FontAwesomeIcon icon={faCommentAlt} />
              <label>Comment</label>
            </button>
          </div>

          <div>{props.Likes.length} Users Like this post</div>
          <textarea
            className={classes.userComment}
            name="comment"
            placeholder="enter your comment"
            onChange={onTypingComment}
            value={currentTypingComment}
            rows={4}
          />
          <ul
            style={{
              listStyleType: "none",
              textAlign: "left",
            }}
          >
            {comments}
          </ul>
        </div>
      </Card>
    </span>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
