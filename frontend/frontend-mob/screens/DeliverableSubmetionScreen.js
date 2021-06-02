import React from "react";
import { View, StyleSheet } from "react-native";
import Quiz from "../components/Quiz";
import Assignment from "../components/Assignment";
const DeliberableSubmetionScreen = (props) => {
  //if the delevrable type is quiz
  // show the quiz question component
  //else
  // show the adding files part

  let renderedItem = <Quiz {...props} ></Quiz>;
  if (props.navigation.getParam("deliverableType") === "Assignment") {
    renderedItem = <Assignment {...props} ></Assignment>;
  }
  return <View style={styles.screen}>{renderedItem}</View>;
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DeliberableSubmetionScreen;
