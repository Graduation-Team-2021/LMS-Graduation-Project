import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
const filler =
  "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=johannes-plenio-qkfxBc2NQ18-unsplash.jpg&w=2400";
const CoursePreview = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate({
          routeName: "Course",
          params: {
            course: props.Course,
            groupflag: props.groupflag,
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
