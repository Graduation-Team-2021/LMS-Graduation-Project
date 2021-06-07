import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";

const CourseDerscerption = (props) => {
  const Course = props.navigation.getParam("Course");
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        style={{ width: "100%", height: "40%" }}
        //source={require($`props.image`)}
        source={{
          uri: Course.CoursePicture,
        }}
      />
      <ScrollView>
        <Text style={{ padding: 20, fontSize: 24, textAlign: "center" }}>
          {Course.CourseDescription}
        </Text>
      </ScrollView>
      <Text style={{ padding: 20, fontSize: 24, textAlign: "center" }}>
        {Course.CourseName}
      </Text>
      <Button
        //title= "go to $`props.CourseName`"
        title={`Go To ${Course.CourseName}`}
        color="#F0F8FF"
        onPress={() => {
          props.navigation.navigate({
            routeName: "Course",
            params: { course: Course, groupflag: false },
          });
        }}
      />
    </View>
  );
};

export default CourseDerscerption;
