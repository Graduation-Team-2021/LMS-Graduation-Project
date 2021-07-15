import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Avatar } from "react-native-elements";
import sha256 from "crypto-js/sha512";

const CourseListItem = (props) => {
  const Course = props.Course;
  const hashedItem = sha256(JSON.stringify(Course));
  let avatarColor = "#";
  for (let index = 0; index < 6; index++) {
    const element = hashedItem.words[index];
    const newIndex = Math.abs(element % 16);
    avatarColor = avatarColor.concat(newIndex.toString(16));
  }
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
            size="large"
            containerStyle={{
              backgroundColor: avatarColor,
              justifyContent: "center",
            }}
            title={Course.CourseID.toUpperCase()}
            titleStyle={{ fontSize: 14 }}
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
