import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import sha256 from "crypto-js/sha512";

const CoursePreview = (props) => {
  const target = props.Course;
  const hashedItem = sha256(JSON.stringify(target));
  let avatarColor = "#";
  let firstColor = "#";
  let lastColor = "#";
  for (let index = 0; index < 6; index++) {
    const element = hashedItem.words[index];
    const element1 =
      hashedItem.words[Math.abs(element % hashedItem.words.length)];
    const element2 =
      hashedItem.words[Math.abs(element1 % hashedItem.words.length)];
    const newIndex = Math.abs(element % 16);
    const newIndex1 = Math.abs(element1 % 16);
    const newIndex2 = Math.abs(element2 % 16);
    avatarColor = avatarColor.concat(newIndex.toString(16));
    firstColor = firstColor.concat(newIndex1.toString(16));
    lastColor = lastColor.concat(newIndex2.toString(16));
  }
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
      <Card containerStyle={styles.containingCard}>
        <View style={styles.courseNameContainingView}>
          <Text style={styles.courseName}>{props.Course.CourseName}</Text>
        </View>
        <Avatar
          size="xlarge"
          title={props.Course.CourseName}
          containerStyle={{
            ...styles.containingCard,
            backgroundColor: avatarColor,
          }}
          titleStyle={{ fontSize: 30 }}
          source={
            props.Course.CoursePicture
              ? { uri: props.Course.CoursePicture }
              : null
          }
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containingCard: { borderRadius: 20 },
  courseNameContainingView: { alignItems: "center", justifyContent: "center" },
  courseName: { fontSize: 20, color: "red", fontWeight: "bold" },
});

export default CoursePreview;
