import React from "react";
import { View, Text, Stylesheet, TextInput } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
const Post = () => {
  return (
    <Card
      wrapperStyle={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "stretch",
      }}
      containerStyle={{borderRadius:20}}
    >
      <Text>post by : owener name </Text>
      <Text> contant </Text>
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
    </Card>
  );
};

export default Post;
