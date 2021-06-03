import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Icon } from "react-native-elements";
const BeingUploadedFile = (props) => {
  return (
    <View style={styles.element}>
      <Avatar
        size="medium"
        rounded
        title={props.file.name.split(".")[1]}
        activeOpacity={0.7}
        onPress={() => console.log("hello")}
        containerStyle={{
          backgroundColor: "gray",
          justifyContent: "center",
        }}
      />
      <Text>{props.file.name}</Text>
      <Icon name='cancel' onPress={() => props.changeList(props.index)} />
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
    //backgroundColor: "red",
    width: "100%",
  },
});

export default BeingUploadedFile;
