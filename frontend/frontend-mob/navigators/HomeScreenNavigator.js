import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import CourseScreen from "../screens/CourseScreen";
import VideoScreen from "../screens/VideoScreen";
import CourseListScreen from '../screens/CoursesListScreen';

const studentName = "Ibrahim";

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { title: `${studentName}` } },
  Course: {
    screen: CourseScreen,
    navigationOptions: (navData) => {
      return {
        title: `${navData.navigation.getParam("courseName")}`,
      };
    },
  },
  Video: { screen: VideoScreen },
  CourseList: {screen:CourseListScreen}
});

export default createAppContainer(HomeStack);
