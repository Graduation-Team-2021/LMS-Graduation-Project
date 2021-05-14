import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";

import About from '../components/About'
import NewPost from "../components/NewPost";

const CourseScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <About />
        <View>
          <Button
            title="Videos"
            type="outline"
            containerStyle={styles.buttonContainer}
          />
          <Button title="PDFs" containerStyle={styles.buttonContainer} />
        </View>
      </View>
      <NewPost />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
  },
  buttonContainer: {
    paddingVertical: 5,
  },
});

export default CourseScreen;
