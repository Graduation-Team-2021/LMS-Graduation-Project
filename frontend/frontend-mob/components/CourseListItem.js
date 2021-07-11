import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Avatar } from "react-native-elements";

const CourseListItem = (props) => {
  const Course = props.Course;
  const navigation = props.navigation;
  return (
    <View style={{ margin: 10 }}>
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate({
            routeName: "CourseDescription",
            params: { courseName: Course.CourseName, Course: Course },
          })
        }
      >
        <View style={{ flexDirection: "row" }}>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri: Course.CoursePicture,
            }}
          />
          <View style={{ justifyContent: "center", padding: 15 }}>
            <Text>{Course.CourseName}</Text>
            <Text>{Course.CourseCode}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default CourseListItem;
