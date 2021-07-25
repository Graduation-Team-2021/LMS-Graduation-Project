import React, { useState, useEffect } from "react";
import { View, Text, Stylesheet, TextInput } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { Comment, Like, UnLike } from "../Interface/Interface";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";

const Post = (props) => {
  const postData = props.post;
  const Comments = [];
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    for (
      let index = 0;
      index < (postData.Comments.length > 2 ? 2 : postData.Comments.length);
      index++
    ) {
      Comments.push(
        <Text key={index}>
          {postData.Comments[index].commenter_name}:{" "}
          {postData.Comments[index].comment}
        </Text>
      );
    }
    if (postData.Comments.length > 2) {
      Comments.push(<Text key={2}>Show More Comments</Text>);
    }
    setPostComments(Comments);
  }, [])


  const [likeButtonColor, setLikeButtonColor] = useState(!postData.isLiked);
  const [currentTypingComment, setCurrentTypingComment] = useState("");

  let onTypingComment = (event) => {
    setCurrentTypingComment(event);
  };
  const commentPressHandler = async () => {
    if (currentTypingComment === "") {
      alert("this is an empty comment");
      return;
    }
    let temp = {
      comment: currentTypingComment,
      commenter_name: props.userData.Name,
      commenter_id: props.userData.ID,
    };
    //Todo: set comments
    await Comment(
      props.userData.Token,
      props.userData.ID,
      postData.PostId,
      currentTypingComment
    );
    if (postComments.length <= 2) {
      setPostComments([
        ...postComments,
        <Text key={postComments.length}>
          {temp.commenter_name}: {temp.comment}
        </Text>,
      ]);
    }
    setCurrentTypingComment("");
  };

  const likePressHandler = async () => {
    if (likeButtonColor) {
      await Like(props.userData.Token, props.userData.ID, postData.PostId);
    } else {
      await UnLike(props.userData.Token, props.userData.ID, postData.PostId);
    }
    setLikeButtonColor((value) => !value);
    // TODO: set liked in the database (send the request)
  };

  return (
    <Card
      wrapperStyle={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "stretch",
      }}
      containerStyle={{ borderRadius: 20 }}
    >
      <Text>post by : {postData.Name} </Text>
      <Text>{postData.Desc}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "60%",
          padding: 15,
        }}
      >
        <Button
          title={!likeButtonColor ? "liked" : "like"}
          icon={
            <Icon
              color={!likeButtonColor ? "blue" : "black"}
              name={!likeButtonColor ? "like1" : "like2"}
              type="antdesign"
            />
          }
          type="clear"
          onPress={likePressHandler}
        />
        <Button
          title="comment"
          icon={<Icon name="comment" type="FontAwesome" />}
          type="clear"
          onPress={commentPressHandler}
        />
      </View>
      <TextInput
        value={currentTypingComment}
        onChangeText={onTypingComment}
        placeholder=" enter your comment"
        multiline
        style={{ borderWidth: 2, width: "100%", height: 50 }}
      />
      {postComments}
    </Card>
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(Post);
