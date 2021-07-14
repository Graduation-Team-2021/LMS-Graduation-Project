import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Waiting from "../../Components/Waiting/Waiting";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import CourseDescription from "../CourseDesc/CourseDesc.js";
import NewPostCard from "../../Components/New Post/NewPost";
import Button from "../../Components/Button/Button";
import classes from "./CoursePage.module.css";
import {
  getAllPosts,
  uploadPost,
  getCourseByID,
} from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setNewPost, setLocationPost } from "../../Models/Post";

const CoursePage = (props) => {
  const [isJoined, Token, userID, Name] = [
    props.location.state.isJoined,
    props.userData.Token,
    props.userData.ID,
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
  const [MainLoading, setMainLoading] = useState(true);
  const [PostLoading, setPostLoading] = useState(true);

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
      setMainLoading(false);
      setCourse(res);
    });
  }, [Token, courseID]);

  useEffect(() => {
    //Loading Data from Server
    getAllPosts(Token, postID).then((value) => {
      setPostLoading(false);
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

  return (
    <React.Fragment>
      <Modal show={clicked} onClick={hide}>
        <NewPost submit={SubmitPost} dismiss={hide} />
      </Modal>
      <Waiting Loading={MainLoading}>
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
                {isJoined === "true" ? null : (
                  <Button onClick={props.Joining.bind(this, courseID)}>
                    Enroll  
                  </Button>
                )}
              </div>
            </div>
            <div className={classes.small}>
              <CourseDescription
                Role={props.userData.Role}
                desc={Desc}
                CourseID={courseID}
                Title={Title}
                Course={props.location.state.Data}
              />
            </div>

            {isJoined === "true" ? <NewPostCard Focus={Focus} /> : null}
            <Waiting Loading={PostLoading}>
              <div className={classes.PostsHolder}>
                <div className={classes.posts}>{Posts}</div>
              </div>
            </Waiting>
          </Card>
          <div className={classes.large}>
            <CourseDescription
              Role={props.userData.Role}
              desc={Desc}
              CourseID={courseID}
              Title={Title}
              Course={props.location.state.Data}
            />
          </div>
        </div>
      </Waiting>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
