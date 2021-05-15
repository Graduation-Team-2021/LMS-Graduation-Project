import React from "react";
import { View, FlatList, StyleSheet,Text } from "react-native";
import CourseListItem from "../components/CourseListItem";

const DummyCourses = [
    {
        courseName: "Deepwebish Course One",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },
      {
        courseName: "Deepwebish Course Two",
        courseDescription: "The Discription of Deepwebish Course Two",
        courseCode: "CSE401",
        coursePicURI: "https://images4.alphacoders.com/589/thumb-1920-589395.jpg",
      },
      {
        courseName: "Deepwebish Course Three",
        courseDescription: "The Discription of Deepwebish Course Three",
        courseCode: "CSE402",
        coursePicURI: "https://images7.alphacoders.com/303/303155.jpg",
      },
      {
        courseName: "Deepwebish Course Foyur",
        courseDescription: "The Discription of Deepwebish Course Four",
        courseCode: "CSE403",
        coursePicURI: "https://images7.alphacoders.com/303/303155.jpg",
      },{
        courseName: "Deepwebish Course One",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },
      {
        courseName: "Deepwebish Course Two",
        courseDescription: "The Discription of Deepwebish Course Two",
        courseCode: "CSE401",
        coursePicURI: "https://images4.alphacoders.com/589/thumb-1920-589395.jpg",
      },
      {
        courseName: "Deepwebish Course Three",
        courseDescription: "The Discription of Deepwebish Course Three",
        courseCode: "CSE402",
        coursePicURI: "https://images7.alphacoders.com/303/303155.jpg",
      },
      {
        courseName: "Deepwebish Course Foyur",
        courseDescription: "The Discription of Deepwebish Course Four",
        courseCode: "CSE403",
        coursePicURI: "https://images7.alphacoders.com/303/303155.jpg",
      },{
        courseName: "Deepwebish Course One",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },
      {
        courseName: "Deepwebish Course Two",
        courseDescription: "The Discription of Deepwebish Course Two",
        courseCode: "CSE401",
        coursePicURI: "https://images4.alphacoders.com/589/thumb-1920-589395.jpg",
      },
      {
        courseName: "Deepwebish Course Three",
        courseDescription: "The Discription of Deepwebish Course Three",
        courseCode: "CSE402",
        coursePicURI: "https://images7.alphacoders.com/303/303155.jpg",
      },
      {
        courseName: "Deepwebish Course Foyur",
        courseDescription: "The Discription of Deepwebish Course Four",
        courseCode: "CSE403",
        coursePicURI: "https://images7.alphacoders.com/303/303155.jpg",
      },
];

const AllCoursesList = (props) => {
  const renderItem = ({ item }) => {
    return <CourseListItem Course={item} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={DummyCourses}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AllCoursesList;
