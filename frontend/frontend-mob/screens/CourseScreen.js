import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { getAllPosts, uploadPost } from "../Interface/Interface";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import { setLocationPost, setNewPost } from "../Models/Post";
import Post from "../components/Post";

import About from "../components/About";
import NewPost from "../components/NewPost";

const data = ["sklahjdlsa"];

const CourseScreen = (props) => {
  let myCourse = props.navigation.getParam("course");
  const [Data, setData] = useState(data);

  useEffect(() => {
    getAllPosts(props.userData.Token, myCourse.PostID).then((res) => {
      const Posts = [];
      if (res) {
        res.forEach((ele) => {
          Posts.push(
            setLocationPost(ele, myCourse.CourseName, props.userData.ID)
          );
        });
        Posts.reverse();
        setData([...data, ...Posts]);
      }
    });
  }, []);

  const [post, setPost] = useState("");

  const Submit = async () => {
    let postdata = setNewPost(post, myCourse.CourseName, props.userData.Name);
    let id = await uploadPost(
      props.userData.Token,
      props.userData.ID,
      myCourse.PostID,
      post
    );

    if (id) {
      postdata.PostId = id;
      let temp = [...data, postdata, ...Data.slice(1)];
      setData(temp);
    }
    setPost("")
  };

  const courseDetails = (
    <View>
      <Button
        title="Videos"
        type="outline"
        containerStyle={styles.buttonContainer}
        onPress={() => props.navigation.navigate("Video")}
      />
      <Button title="PDFs" containerStyle={styles.buttonContainer} />
    </View>
  );
  const renederitem = (itemdata) => {
    if (itemdata.index === 0) {
      return <NewPost setPost={setPost} Submit={Submit} post={post} />;
    }
    return <Post post={itemdata.item} />;
  };
  const groupflag = props.navigation.getParam("groupflag");
  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <About description={myCourse.CourseDescription} />
      </View>
      {groupflag ? null : courseDetails}
      <View style={{ width: "90%", flex: 1 }}>
        <FlatList
          data={Data}
          renderItem={renederitem}
          keyExtractor={(_, index) => `${index}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
  },
  buttonContainer: {
    paddingVertical: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseScreen);
