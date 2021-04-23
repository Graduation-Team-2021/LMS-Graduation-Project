import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import CoursePreview from "../components/CoursePreview";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <CoursePreview
        Course={{
          CourseName: "Hello WOrld",
          CoursePicture: "https://images3.alphacoders.com/193/193677.jpg",
        }}
      />
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

export default HomeScreen;
