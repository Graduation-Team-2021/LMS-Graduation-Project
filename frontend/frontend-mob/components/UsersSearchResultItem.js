import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import sha256 from "crypto-js/sha512";

const UsersSearchResultItem = (props) => {
  const hashedItem = sha256(JSON.stringify(props.item));
  let avatarColor = "#";
  for (let index = 0; index < 6; index++) {
    const element = hashedItem.words[index];
    const newIndex = Math.abs(element % 16);
    avatarColor = avatarColor.concat(newIndex.toString(16));
  }
  const elementWidth =
    Dimensions.get("window").width >= Dimensions.get("window").height
      ? Dimensions.get("window").width * 0.35
      : Dimensions.get("window").width * 0.9;
  return (
    <View style={{ width: elementWidth, margin: 3 }}>
      <ListItem
        onPress={() =>
          props.navigation.navigate("ForeignProfile", { target: props.item })
        }
      >
        <Avatar
          size="small"
          rounded
          activeOpacity={0.7}
          containerStyle={{
            backgroundColor: avatarColor,
            justifyContent: "center",
          }}
          title={props.item.name[0].toUpperCase()}
          titleStyle={{ fontSize: 20 }}
          source={
            props.item.picture != null ? { uri: props.item.picture } : null
          }
        />
        <ListItem.Content>
          <ListItem.Title>{props.item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  element: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default UsersSearchResultItem;
