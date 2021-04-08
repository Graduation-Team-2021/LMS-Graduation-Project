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

const CoursePage = (props) => {
  const [courseID, isJoined, postID, Title, Token, userID, Role, Desc] = [
    props.match.params.id,
    props.location.state.isJoined,
    props.location.state.postID,
    props.location.state.name,
    props.userData.Token,
    props.userData.ID,
    props.userData.Role,
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
          let Liked = false;
          for (let index = 0; index < ele["likes"].length; index++) {
            if (ele["likes"][index]["liker_id"] === userID) {
              Liked = true;
              break;
            }
          }
          Posts.push({
            Name: ele["name"],
            Location: Title,
            Title: `Post by ${ele["name"]}`,
            Desc: ele["post_text"],
            PostId: ele["post_id"],
            Likes: ele["likes"],
            isLiked: Liked,
            Comments: ele['comments']
          });
        });
        console.log(Posts);
        const posts = Posts.map((post, index) => (
          <Post key={index} {...post} />
        ));
        setPosts(posts);
      }
    });
  }, [Token, postID, userID,Title, Course]);

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
