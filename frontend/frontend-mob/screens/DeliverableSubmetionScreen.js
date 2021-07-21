import React from "react";
import { View, StyleSheet } from "react-native";
import Quiz from "../components/Quiz";
import Assignment from "../components/Assignment";
const DeliberableSubmetionScreen = (props) => {


  let renderedItem = <Quiz {...props} />;
  return <View style={styles.screen}>{renderedItem}</View>;
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DeliberableSubmetionScreen;
