import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";

const CourseListItem = ({ Course }) => {
  console.log(Course);
  return (
    <View style={{ margin: 10 }}>
      <TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri: Course.coursePicURI,
            }}
          />
          <View style={{justifyContent: "center",padding:15}}>
            <Text>{Course.courseName}</Text>
            <Text>{Course.courseCode}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CourseListItem;
