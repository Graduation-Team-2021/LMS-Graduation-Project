import React from "react";

import Card from '../Card/Card'
import classes from './NewPost.module.css';

const NewPost = (props) => {
  return (
    <Card shadow>
      <div className={classes.NewPost}>
        <label className={classes.newPostLabel}>Write a new Post Here</label>
        <div className={classes.PostButton}>
          <button className={classes.InnerPostButton} title="" onClick={props.Focus}>
            What's on Your Mind?
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NewPost;
