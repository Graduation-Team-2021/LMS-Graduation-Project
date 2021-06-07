import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import CourseListItem from "../components/CourseListItem";
import { getCourses } from "../Interface/Interface.js";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { setCourse } from "../Models/Course";

const DummyCourses = [
  {
    CourseName: "Deepwebish Course One",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course 2",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course 3",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course 4",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course 5",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course 6",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course 7",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course 8",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course 9",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course One",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    CourseName: "Deepwebish Course One",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
];

const AllCoursesList = (props) => {

  const [AllCourses, setAllCourses] = useState([])

  useEffect(() => {
    getCourses(props.userData.Token).then((res) => {
      if (res) {
        let Courses = [];
        console.log(res);
        res.forEach((id, index) => {
          id["pic"] =
            index % 3 === 0
              ? "https://miro.medium.com/max/2560/1*tYxWuyksovxA1Thu8PggPQ.jpeg"
              : index % 3 === 1
              ? "https://cdn.britannica.com/w:1100/50/190450-131-527BAEF7/series-Elementary-Particles-subject-forms-nuclear-physics.jpg"
              : "https://i.pinimg.com/736x/c8/e5/75/c8e5753370bad54c7977d485e0a0e29d.jpg";
          id["isenrolled"] = "false";
          for(let index2=0; index2<props.currentCourses.currentCourses.length; index2++ ) {
            if (props.currentCourses.currentCourses[index2]["CourseID"] === id["course_code"]) {
              id["isenrolled"] = "true";
              break;
            }
          };
          Courses.push(setCourse(id));
        });
        setAllCourses(Courses);
      }
    });
  }, []);

  const renderItem = ({ item }) => {
    return <CourseListItem Course={item} navigation={props.navigation} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={AllCourses}
        renderItem={renderItem}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCoursesList);
