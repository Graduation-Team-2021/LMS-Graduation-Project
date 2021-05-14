import React from "react";
import { View, Text, StyleSheet , TextInput} from "react-native";
import { Card, Button } from "react-native-elements";

const NewPost = (props) => {
  return (
    <Card containerStyle={{ borderRadius: 20, width: "90%" }}>
      <Text>Write a new Post Here</Text>
      <View>
      <TextInput
      style={styles.input}  
      placeholder="write your post here"
      multiline
      />
        <Button type="clear" title="sumbit" onPress={() => console.log("write new post on card ") } />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
  },
});

export default NewPost;
