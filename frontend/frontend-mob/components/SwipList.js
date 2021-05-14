import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CoursePreview from "./CoursePreview";

const dummydata = [
  {
    CourseName: "Tst1",
    CoursePicture: "https://images5.alphacoders.com/903/903845.png",
  },
  {
    CourseName: "Tst2",
    CoursePicture: "https://images2.alphacoders.com/732/732856.jpg",
  },
  {
    CourseName: "Tst3",
    CoursePicture: "https://images3.alphacoders.com/714/714619.png",
  },
  {
    CourseName: "Tst4",
    CoursePicture: "https://images.alphacoders.com/105/1058766.png",
  },
];

const SwipeList = (props) => {
  return (
    <View style={{height: 250}}>
      <FlatList
        data={dummydata}
        keyExtractor ={(item,index)=>`${index}`}
        renderItem={(item) => {
          return <CoursePreview Course={item.item} navigation={props.navigation} />;
        }}
        horizontal
      />
    </View>
  );
};

export default SwipeList;
