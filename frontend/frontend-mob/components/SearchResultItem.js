import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import sha256 from "crypto-js/sha512";

const SearchResultItem = (props) => {
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
    <View
      style={{ ...styles.element, width: elementWidth }}
    >
      <Avatar
        size="medium"
        rounded
        activeOpacity={0.7}
        onPress={() => console.log("hello")}
        containerStyle={{
          backgroundColor: avatarColor,
          justifyContent: "center",
        }}
        source={
          props.item.picture !== null ? { uri: props.item.picture } : null
        }
        title={props.item.name[0].toUpperCase()}
      />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text>{props.item.name}</Text>
      </View>
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

export default SearchResultItem;
