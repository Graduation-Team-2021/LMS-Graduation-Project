import classes from "./GroupPage.module.css";
import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import TopBar from "../../Components/TopBar/TopBar";
import Modal from "../../Components/Modal/Modal";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import GroupDescription from "../GroupDesc/GroupDesc.js";
import {withRouter} from 'react-router-dom'

const HomePage = (props) => {
  const [id, isJoined] = [props.match.params.id, props.match.params.isJoined];
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Main, setMain] = useState(classes.otherMain);
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
    const groupData = [];
    const posts = [];
    for (let index = 0; index < 20; index++) {
      posts.push(
        <Post
          key={index}
          Title={`Post ${20 - index}`}
          Content={`Blah Blah Blah .....`}
        />
      );
      groupData.push({
        id: index,
        Title: `Group ${index + 1}`,
        Desc: "Blah Blah Blah",
      });
      if (Number(id) === index) {
        setTitle(groupData[id].Title);
        setDesc(groupData[id].Desc);
      }
    }
    setPosts(posts);
  }, [id]);

  const SubmitPost = (post) => {
    console.log(post);
    let temp = [
      <Post
        key={Posts.length}
        Title={`Post ${Posts.length + 1}`}
        Content={post}
      />,
      ...Posts,
    ];
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
        <TopBar Name={props.Name} id={props.id} />
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
                      props.Joining(id);
                      props.history.push('/')
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
                      <div className={Main}>
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
