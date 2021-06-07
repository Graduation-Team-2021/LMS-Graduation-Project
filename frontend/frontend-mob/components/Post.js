import React from "react";
import { View, Text, Stylesheet, TextInput } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
const Post = (props) => {
  const postData = props.post

  const Comments = []

  for (let index = 0; index < (postData.Comments.length>2?2:postData.Comments.length); index++) {
    Comments.push(<Text key={index}>{postData.Comments[index]}</Text>)
  }
  if(postData.Comments.length>2){
    Comments.push(<Text key={2}>Show More Comments</Text>)
  }
  if(postData.Comments.length===0){
    Comments.push(<Text key={0}>No Comments Yet</Text>)
  }

  return (
    <Card
      wrapperStyle={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "stretch",
      }}
      containerStyle={{borderRadius:20}}
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
          title="like"
          icon={<Icon name="like2" type="antdesign" />}
          type="clear"
        />
        <Button
          title="comment"
          icon={<Icon name="comment" type="FontAwesome" />}
          type="clear"
        />
      </View>
      <TextInput
        placeholder=" enter your comment"
        multiline
        style={{ borderWidth: 2, width: "100%", height: 50 }}
      />
      {Comments}
    </Card>
  );
};

export default Post;
