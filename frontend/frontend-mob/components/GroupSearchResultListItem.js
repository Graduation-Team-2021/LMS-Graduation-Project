import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import sha256 from "crypto-js/sha512";

const GroupSearchResultItem = (props) => {
  const hashedItem = sha256(JSON.stringify(props.item));
  let avatarColor = "#";
  for (let index = 0; index < 6; index++) {
    const element = hashedItem.words[index];
    const newIndex = Math.abs(element % 16);
    avatarColor = avatarColor.concat(newIndex.toString(16));
  }
  const elementWidth =
    Dimensions.get("window").width >= Dimensions.get("window").height
      ? Dimensions.get("window").width * 0.3
      : Dimensions.get("window").width * 0.9;
  return (
    <View style={{width:elementWidth,margin:3}} >
      <ListItem>
        <Avatar
          size="large"
          rounded
          activeOpacity={0.7}
          containerStyle={{
            backgroundColor: avatarColor,
            justifyContent: "center",
          }}
          title={props.item.group_id}
          titleStyle={{ fontSize: 20 }}
        />
        <ListItem.Content>
          <ListItem.Title>{props.item.group_name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};



export default GroupSearchResultItem;
