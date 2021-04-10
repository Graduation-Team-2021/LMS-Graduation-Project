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
import { setNewPost,setLocationPost } from "../../Models/Post";

const CoursePage = (props) => {
  const [courseID, isJoined, postID, Title, Token, userID, Role, Name, Desc] = [
    props.match.params.id,
    props.location.state.isJoined,
    props.location.state.postID,
    props.location.state.name,
    props.userData.Token,
    props.userData.ID,
    props.userData.Role,
    props.userData.Name,
    props.location.state.Desc,
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
        console.log(Posts);
        const posts = Posts.map((post, index) => (
          <Post key={index} {...post} />
        ));
        posts.reverse()
        setPosts(posts);
      }
    });
  }, [Token, postID, userID,Title, Course]);

  const SubmitPost = async (post) => {
    console.log(post);
    let data = setNewPost(post, Title, userID, Name);
    let id = await uploadPost(Token, userID, postID, post);
    if (id) {
      data.PostId=id
      let temp = [
        <Post key={Posts.length} {...data} />,
        ...Posts,
      ];
      setPosts(temp);
    } else {
      alert("Couldn't Upload the Post, Please Try again later")
    }
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
            <h1>{Title}</h1>
            <div className={classes.small}>
              <CourseDescription
                desc={Desc}
                CourseID={courseID}
              />
            </div>
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
            {isJoined === "true" ? <NewPostCard Focus={Focus} /> : null}
            <div className={classes.PostsHolder}>
              <div className={classes.posts}>{Posts}</div>
            </div>
          </Card>
          <div className={classes.large}>
            <CourseDescription
              desc={Desc}
              CourseID={courseID}
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
