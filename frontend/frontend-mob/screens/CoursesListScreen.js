import React  from "react";
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
        courseName: "Deepwebish Course 2",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course 3",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course 4",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course 5",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course 6",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course 7",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course 8",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course 9",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course 0",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },{
        courseName: "Deepwebish Course One",
        courseDescription: "The Discription of Deepwebish Course One",
        courseCode: "CSE400",
        coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
      },
      
      
];

const AllCoursesList = (props) => {
  const renderItem = (itemData) => {
    return <CourseListItem Course={itemData.item} navigation={props.navigation} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={DummyCourses}
        renderItem={renderItem}
        keyExtractor={(_,index)=>index}
      />
    </View>
  );
};

export default AllCoursesList;
