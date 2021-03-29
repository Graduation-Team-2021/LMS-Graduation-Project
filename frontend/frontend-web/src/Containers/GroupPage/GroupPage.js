import classes from "./GroupPage.module.css";
import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import Modal from "../../Components/Modal/Modal";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import GroupDescription from "../GroupDesc/GroupDesc.js";
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
    props.location.state.Desc
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
            Title={`by ${value[value.length-index-1]["name"]}`}
            Content={value[value.length-index-1]["post_text"]}
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
    <div className={classes.Main}>
      <Modal show={clicked} onClick={hide}>
        <NewPost submit={SubmitPost} dismiss={hide} />
      </Modal>
      <Card
        style={{
          backgroundColor: "rgba(243, 238, 238, 0.9)",
          height: "fit-content",
        }}
      >
        <TopBar
          Name={props.Name}
          id={props.id}
          setLogged={props.setLogged}
          Notif={props.Posts}
        />
        <div className={classes.Center}>
          <div
            style={{
              width: "75%",
            }}
          >
            <Card
              style={{
                width: "100%",
                alignItems: "flex-start",
                height: "fit-content",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
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
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isJoined === "true" ? (
                  <Card shadow>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <label
                        style={{
                          flex: "1",
                          fontSize: "20px",
                        }}
                      >
                        Write a new Post Here
                      </label>
                      <div className={classes.otherMain}>
                        <input
                          style={{
                            cursor: "pointer",
                            textAlign: "start",
                            color: "rgb(78, 78, 78)",
                          }}
                          value="What's on Your Mind?"
                          type="button"
                          className={classes.input}
                          onClick={Focus}
                        />
                      </div>
                    </div>
                  </Card>
                ) : null}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",
                }}
              >
                <div className={classes.posts}>{Posts}</div>
              </div>
            </Card>
          </div>
          <GroupDescription desc={Desc} />
        </div>
      </Card>
    </div>
  );
};

export default withRouter(HomePage);
