import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {} from "react-native-elements";

const CourseScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is supposed to be Course {props.navigation.getParam('courseName')} Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CourseScreen;
