import classes from "./NewPost.module.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const NewPost = (props) => {
  const [enabled, setenabled] = useState(false);

  const [Content, setContent] = useState("");

  const enable = (event) => {
    setContent(event.target.value);
    if (event.target.value !== "") 
      setenabled(true);
     else setenabled(false);
  };

  const Submit = () => {
    props.submit(Content);
    setContent("");
    setenabled(false);
  };

  return (
    <div>
      <h2 style={{}}>Create Post</h2>
      <div onClick={props.dismiss} className={classes.dismiss}>
        <FontAwesomeIcon icon={faTimesCircle} size="4x" />
      </div>

      <textarea
        value={Content}
        onChange={enable}
        className={classes.input}
        placeholder="Write a New Post"
      />
      <input
        className={classes.Post}
        type="button"
        disabled={!enabled}
        value="Post"
        onClick={Submit}
      />
    </div>
  );
};

export default NewPost;
