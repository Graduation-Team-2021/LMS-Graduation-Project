import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import CourseListItem from "../components/CourseListItem";
import { getCourses, searchCourses } from "../Interface/Interface.js";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { setCourse } from "../Models/Course";

const DummyCourses = [
  {
    CourseName: "Deepwebish Course One",
    CourseDescription: "The Discription of Deepwebish Course One",
    CourseID: "CSE400",
    CoursePicture: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
];

const AllCoursesList = (props) => {
  const [AllCourses, setAllCourses] = useState([]);

  useEffect(() => {
    let Courses = [];
    const conv = (id) => {
      id["pic"] =
        "https://initiate.alphacoders.com/download/wallpaper/732856/images2/jpg/1296852483450520";
      id["isenrolled"] = "false";
      for (
        let index2 = 0;
        index2 < props.currentCourses.currentCourses.length;
        index2++
      ) {
        if (
          props.currentCourses.currentCourses[index2]["CourseID"] ===
          id["course_code"]
        ) {
          id["isenrolled"] = "true";
          break;
        }
      }
      Courses.push(setCourse(id));
    };
    const searchingQuery = props.navigation.getParam("searchingQuery");
    if (!searchingQuery) {
      getCourses(props.userData.Token).then((res) => {
        if (res) {
          res.forEach((id, _) => {
            conv(id);
          });
          setAllCourses(Courses);
        }
      });
    } else {
      searchCourses(searchingQuery, props.userData.Token).then((res) => {
        res.forEach((id, _) => {
          conv(id);
        });
        setAllCourses(Courses);
      });
    }
  }, []);

  const renderItem = ({ item }) => {
    return <CourseListItem Course={item} navigation={props.navigation} />;
  };
  return (
    <FlatList
      data={AllCourses}
      renderItem={renderItem}
      keyExtractor={(_, index) => `${index}`}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCoursesList);
