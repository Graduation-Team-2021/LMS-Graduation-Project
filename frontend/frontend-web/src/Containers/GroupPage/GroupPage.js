import classes from "./GroupPage.module.css";

import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import GroupDescription from "../GroupDesc/GroupDesc.js";
import NewPostCard from "../../Components/New Post/NewPost";

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getAllPosts, uploadPost } from "../../Interface/Interface";

const HomePage = (props) => {
  const [groupID, isJoined, postID, Title, Token, userID, Desc] = [
    props.match.params.id,
    props.location.state.isJoined,
    props.location.state.postID,
    props.location.state.name,
    props.Token,
    props.ID,
    props.location.state.Desc,
  ];
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
    getAllPosts(Token, postID).then((value) => {
      console.log(value);
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
  }, [Token, postID]);

  const SubmitPost = (post) => {
    console.log(post);
    let temp = [
      <Post key={Posts.length} Title={`by ${props.Name}`} Content={post} />,
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
      <div className={classes.Center}>
        <div className={classes.MainArea}>
          <Card className={classes.Card}>
            <div className={classes.Title}>
              <h1>{Title}</h1>
              {isJoined === "false" ? (
                <input
                  type="button"
                  value="Join Group"
                  className={classes.Join}
                  onClick={() => {
                    props.Joining(groupID);
                    props.history.push("/");
                  }}
                />
              ) : null}
            </div>
            {isJoined === "true" ? <NewPostCard Focus={Focus} /> : null}
            <div className={classes.PostsHolder}>
              <div className={classes.posts}>{Posts}</div>
            </div>
          </Card>
        </div>
        <GroupDescription desc={Desc}/>
      </div>
    </React.Fragment>
  );
};

export default withRouter(HomePage);
