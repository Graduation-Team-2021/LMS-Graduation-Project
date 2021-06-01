import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import CourseDescription from "../CourseDesc/CourseDesc.js";
import NewPostCard from "../../Components/New Post/NewPost";
import classes from "./CoursePage.module.css";
import {
  getAllPosts,
  uploadPost,
  getCourseByID,
} from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setNewPost, setLocationPost } from "../../Models/Post";

const CoursePage = (props) => {
  const [isJoined, Token, userID, Role, Name] = [
    props.location.state.isJoined,
    props.userData.Token,
    props.userData.ID,
    props.userData.Role,
    props.userData.Name,
  ];

  const {
    CourseID: courseID,
    CourseName: Title,
    PostID: postID,
    CourseDescription: Desc,
  } = props.location.state.Data;

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
    getCourseByID(Token, courseID).then((res) => {
      setCourse(res);
    });
  }, [Token, courseID]);

  useEffect(() => {
    //Loading Data from Server
    getAllPosts(Token, postID).then((value) => {
      const Posts = [];
      if (value) {
        value.forEach((ele) => {
          Posts.push(setLocationPost(ele, Title, userID));
        });
        const posts = Posts.map((post, index) => (
          <Post key={index} {...post} />
        ));
        posts.reverse();
        setPosts(posts);
      }
    });
  }, [Token, postID, userID, Title, Course]);

  const SubmitPost = async (post) => {
    let data = setNewPost(post, Title, Name);
    let id = await uploadPost(Token, userID, postID, post);
    if (id) {
      data.PostId = id;
      let temp = [<Post key={Posts.length} {...data} />, ...Posts];
      setPosts(temp);
    } else {
      alert("Couldn't Upload the Post, Please Try again later");
    }
    hide();
  };

  const loadDeliverables = () => {
    //TODO: use this for routing
    props.history.push({
      pathname: `/Course/${courseID}/Deliv`,
      state: {
        id: courseID,
      },
    });
  };

  const addDeliverables = () => {
    //TODO: use this for routing
    props.history.push({
      pathname: `/Course/${courseID}/newDeliv`,
    });
  };

  return (
    <React.Fragment>
      <Modal show={clicked} onClick={hide}>
        <NewPost submit={SubmitPost} dismiss={hide} />
      </Modal>
      {Course ? (
        <div className={classes.Center}>
          <Card shadow className={classes.Course}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h1>{Title}</h1>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
                            name: Title,
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
                {Role === "student" && isJoined === "true" ? (
                  <button
                    className={classes.Join}
                    onClick={() => {
                      loadDeliverables();
                    }}
                  >
                    Check Deliverables
                  </button>
                ) : isJoined === "true" ? (
                  <button
                    className={classes.Join}
                    onClick={() => {
                      addDeliverables();
                    }}
                  >
                    Add New Deliverable
                  </button>
                ) : null}
              </div>
            </div>
            <div className={classes.small}>
              <CourseDescription desc={Desc} CourseID={courseID} />
            </div>

            {isJoined === "true" ? <NewPostCard Focus={Focus} /> : null}
            <div className={classes.PostsHolder}>
              <div className={classes.posts}>{Posts}</div>
            </div>
          </Card>
          <div className={classes.large}>
            <CourseDescription
              desc={Desc}
              CourseID={courseID}
              Title={Title}
              Course={props.location.state.Data}
            />
          </div>
        </div>
      ) : (
        <h1>Loading.......</h1>
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
