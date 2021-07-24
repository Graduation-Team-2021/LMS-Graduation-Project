import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Waiting from "../../Components/Waiting/Waiting";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import CourseDescription from "../CourseDesc/CourseDesc.js";
import NewPostCard from "../../Components/New Post/NewPost";
import classes from "./CoursePage.module.css";
import { getAllPosts, uploadPost } from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setNewPost, setLocationPost } from "../../Models/Post";
import Button from "../../Components/Button/Button";

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

  const [clicked, setclicked] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [PostLoading, setPostLoading] = useState(true);
  const [content, setContent] = useState("Post");
  const [done, setdone] = useState(false);
  const [mid, setMid] = useState(0);
  const [final, setFinal] = useState(0);
  const [Assignments, setAssignments] = useState([]);

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
  }, [Token, postID, userID, Title]);

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

  const Uploading = (
    <Waiting Loading={done}>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        <h2>Upload Successful</h2>
        <Button onClick={() => this.setState({ clicked: false })}>Close</Button>
      </div>
    </Waiting>
  );

  console.log(props.location.state.Data);

  const Marks = (
    <Waiting Loading={done}>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        <h2>Marks Summary</h2>
        {Assignments.map((value) => (
          <h2>
            {value.name}: {value.value!==null?`${value.value} out of ${value.total}`:"Not graded"}
          </h2>
        ))}
        <h2>
          Midterm: {mid!==null?`${mid} out of ${props.location.state.Data.mid}`:"Not graded"}
        </h2>
        <h2>
          Final: {final!==null?`${final} out of ${props.location.state.Data.final}`:"Not graded"}
        </h2>
        <Button onClick={() => this.setState({ clicked: false })}>Close</Button>
      </div>
    </Waiting>
  );

  const newPost = <NewPost submit={SubmitPost} dismiss={hide} />;

  const mContent =
    content === "Post" ? newPost : content === "Upload" ? Uploading : Marks;

  document.title = Title;
  return (
    <React.Fragment>
      <Modal show={clicked} onClick={hide}>
        {mContent}
      </Modal>
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
            ></div>
          </div>
          <div className={classes.small}>
            <CourseDescription
              ID={props.userData.ID}
              setFinal={(f) => setFinal(f)}
              setMid={(f) => setMid(f)}
              setAssign={(f) => setAssignments(f)}
              setShow={(show) => setclicked(show)}
              setWaiting={(wait) => setdone(wait)}
              setContent={(content) => setContent(content)}
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
            ID={props.userData.ID}
            setFinal={(f) => setFinal(f)}
            setMid={(f) => setMid(f)}
            setAssign={(f) => setAssignments(f)}
            setShow={(show) => setclicked(show)}
            setWaiting={(wait) => setdone(wait)}
            setContent={(content) => setContent(content)}
            Role={props.userData.Role}
            desc={Desc}
            CourseID={courseID}
            Title={Title}
            Course={props.location.state.Data}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
