import classes from "./CoursePage.module.css";
import React, { useEffect, useState } from "react";

import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import CourseDescription from "../CourseDesc/GroupDesc.js";

import {
  getAllPosts,
  uploadPost,
  getCourseByID,
} from "../../Interface/Interface";

const CoursePage = (props) => {
  const [courseID, isJoined, postID, Token, userID, Role] = [
    props.match.params.id,
    props.location.state.isJoined,
    props.location.state.postID,
    props.Token,
    props.ID,
    props.Role,
  ];
  const [Course, setCourse] = useState(null);
  const [clicked, setclicked] = useState(false);
  const [Posts, setPosts] = useState([]);

  const hide = () => {
    setclicked(false);
  };

  const show = () => {
    setclicked(true);
  };

  const Focus = () => {
    show();
  };

  useEffect(() => {
    //Loading Data from Server
    getCourseByID(Token, courseID).then((res) => setCourse(res));
    getAllPosts(Token, postID).then((value) => {
      const posts = [];
      for (let index = 0; index < value.length; index++) {
        posts.push(
          <Post
            key={index}
            Title={value[value.length - index - 1]["name"]}
            Content={value[value.length - index - 1]["post_text"]}
          />
        );
      }
      setPosts(posts);
    });
  }, [Token, postID, courseID]);

  const SubmitPost = (post) => {
    console.log(post);
    let temp = [
      <Post key={Posts.length} Title={props.Name} Content={post} />,
      ...Posts,
    ];
    uploadPost(Token, userID, postID, post);
    setPosts(temp);
    hide();
  };

  return (
    <React.Fragment>
      <Modal show={clicked} onClick={hide}>
        <NewPost submit={SubmitPost} dismiss={hide} />
      </Modal>
      {Course ? (
        <div className={classes.Center}>
          <Card className={classes.Course}>
            <h1>{Course["course_name"]}</h1>
            {isJoined === "true" ? (
              Role === "professor" ? (
                <input
                  type="button"
                  value="See Grades"
                  className={classes.Join}
                  onClick={() =>
                    props.history.push({
                      pathname: `/Course/${courseID}/Marks`,
                      state: {
                        name: Course["course_name"],
                      },
                    })
                  }
                />
              ) : null
            ) : (
              <input
                type="button"
                value="Enroll"
                className={classes.Join}
                onClick={props.Joining.bind(this, courseID)}
              />
            )}
            {isJoined === "true" ? (
              <Card shadow>
                <div className={classes.newPostHolder}>
                  <label className={classes.newPostLabel}>
                    Write a new Post Here
                  </label>
                  <div className={classes.otherMain}>
                    <button
                      className={classes.PostButton}
                      title=""
                      onClick={Focus}
                    >
                      What's on Your Mind?
                    </button>
                  </div>
                </div>
              </Card>
            ) : null}
            <div className={classes.PostsHolder}>
              <div className={classes.posts}>{Posts}</div>
            </div>
          </Card>
          <CourseDescription
            desc={Course["course_description"]}
            Role={Role}
            Token={Token}
            CourseID={courseID}
          />
        </div>
      ) : (
        <h1>Loading.......</h1>
      )}
    </React.Fragment>
  );
};

export default CoursePage;