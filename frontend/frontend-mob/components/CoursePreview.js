import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
const filler = "https://avatarfiles.alphacoders.com/263/thumb-1920-263348.jpg";
const CoursePreview = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate({
          routeName: "Course",
          params: {
            courseName: props.Course.CourseName,
          },
        })
      }
    >
      <Card containerStyle={{ borderRadius: 20 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>
            {props.Course.CourseName}
          </Text>
        </View>
        <Image
          source={{
            uri: props.Course.CoursePicture || filler,
          }}
          style={{ width: 170, height: 170, borderRadius: 20 }}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default CoursePreview;
