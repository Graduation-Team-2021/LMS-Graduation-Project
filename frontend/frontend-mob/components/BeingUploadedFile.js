import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import sha256 from "crypto-js/sha512";
const BeingUploadedFile = (props) => {
  const fileExtenstion = props.file.name.split(".")[1];
  const fileExtenstionSHA512 = sha256(fileExtenstion);
  let fileExtenstionColor = "#";
  for (let index = 0; index < 6; index++) {
    const element = fileExtenstionSHA512.words[index];
    const newIndex = Math.abs(element % 16);
    fileExtenstionColor = fileExtenstionColor.concat(newIndex.toString(16));
  }
  return (
    <View style={styles.element}>
      <Avatar
        size="medium"
        rounded
        title={props.file.name.split(".")[1]}
        activeOpacity={0.7}
        containerStyle={{
          backgroundColor: fileExtenstionColor,
          justifyContent: "center",
        }}
      />
      <Text>{props.file.name}</Text>
      <Icon name="cancel" onPress={() => props.changeList(props.index)} />
    </View>
  );
};

const styles = StyleSheet.create({
  element: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default BeingUploadedFile;
