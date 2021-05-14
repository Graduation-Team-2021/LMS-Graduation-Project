import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";

const NewPost = (props) => {
  return (
    <Card containerStyle={{ borderRadius: 20, width: "70%" }}>
      <Text>Write a new Post Here</Text>
      <View>
        <Button type="clear" title="What's on Your Mind?" />
      </View>
    </Card>
  );
};

export default NewPost;
