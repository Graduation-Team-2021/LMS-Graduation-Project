import classes from "./GroupPage.module.css";

import Waiting from '../../Components/Waiting/Waiting'
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import GroupDescription from "../GroupDesc/GroupDesc.js";
import NewPostCard from "../../Components/New Post/NewPost";
import { getAllPosts, uploadPost } from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setLocationPost, setNewPost } from "../../Models/Post";

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const GroupPage = (props) => {
  const [groupID, isJoined, postID, Title, Token, userID, Name, Desc] = [
    props.match.params.id,
    props.location.state.isJoined,
    props.location.state.postID,
    props.location.state.name,
    props.userData.Token,
    props.userData.ID,
    props.userData.Name,
    props.location.state.Desc,
  ];
  const [clicked, setclicked] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [PostsLoading, setPostsLoading] = useState(true)

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
    getAllPosts(Token, postID).then((value) => {
      setPostsLoading(false)
      const Posts = [];
      if (value) {
        value.forEach((ele) => {
          Posts.push(setLocationPost(ele, Title, userID));
        });
        const posts = Posts.map((post, index) => (
          <Post key={index} {...post} />
        ));
        posts.reverse()
        setPosts(posts);
      }
    });
  }, [Token, postID, Title, userID]);

  const SubmitPost = async (post) => {
    console.log(post);
    let data = setNewPost(post, Title, userID, Name);
    
    let id = await uploadPost(Token, userID, postID, post);
    if (id) {
      console.log(id)
      data.PostId=id;
      let temp = [
        <Post key={Posts.length} {...data} />,
        ...Posts
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
      <div className={classes.Center}>
        <div className={classes.MainArea}>
          <Card shadow className={classes.Card}>
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
            <Waiting Loading={PostsLoading}>
              <div className={classes.PostsHolder}>
                <div className={classes.posts}>{Posts}</div>
              </div>
            </Waiting>
          </Card>
        </div>
        <div className={classes.large}>
          <GroupDescription desc={Desc} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupPage)
);
