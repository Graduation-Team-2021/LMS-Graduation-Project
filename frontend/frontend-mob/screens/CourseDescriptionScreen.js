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
          uri: Course.coursePicURI,
        }}
      />
      <ScrollView>
        <Text style={{ padding: 20, fontSize: 24, textAlign: "center" }}>
          {Course.courseDescription}
        </Text>
      </ScrollView>
      <Text style={{ padding: 20, fontSize: 24, textAlign: "center" }}>
        {Course.courseName}
      </Text>
      <Button
        //title= "go to $`props.CourseName`"
        title={`Go To ${Course.courseName}`}
        color="#F0F8FF"
        onPress={() => {
          props.navigation.navigate({
            routeName: "Course",
            params: { courseName: Course.courseName, groupflag: false },
          });
        }}
      />
    </View>
  );
};

export default CourseDerscerption;
