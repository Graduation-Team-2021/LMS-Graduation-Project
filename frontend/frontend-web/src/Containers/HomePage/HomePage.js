import React from "react";
import { connect } from "react-redux";

import CoursesArea from "../CoursesArea/CoursesArea";
import GroupsArea from "../GroupsArea/GroupsArea";
import PostsArea from "../PostsArea/PostsArea";
import Upcoming from "../Upcoming/Upcoming";
import Card from "../../Components/Card/Card";
import classes from "./HomePage.module.css";

import { getRecentPosts } from "../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";
import { setFullPost } from "../../Models/Post";

const HomePage = (props) => {
  document.title="Home Page"

  const setPosts = props.recentUserPostsActions.onSetRecentUserPosts;

  return (
    <div className={classes.Center}>
      <div className={classes.contanier}>
        <Card shadow className={classes.Card}>
          <CoursesArea />
          <GroupsArea />
          <PostsArea
            Title="Latest Posts"
            LoadingPosts={getRecentPosts}
            setPosts={setPosts}
            setPost={setFullPost}
          />
        </Card>
      </div>
        <Upcoming />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
