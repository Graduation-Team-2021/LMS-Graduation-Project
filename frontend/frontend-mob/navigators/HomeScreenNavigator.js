import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import CourseScreen from "../screens/CourseScreen";
import VideoScreen from "../screens/VideoScreen";
import CourseListScreen from "../screens/CoursesListScreen";
import CourseDescriptionScreen from "../screens/CourseDescriptionScreen";
import DeliverableList from "../screens/DeliverableList";
import DeliverableDescriptionScreen from "../screens/DeliverableDescriptionScreen";
import DeliverableSubmetionScreen from "../screens/DeliverableSubmetionScreen";
import ResultsNavigator from "./ResultNavigator";
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
  CourseList: { screen: CourseListScreen },
  DeliverableList: { screen: DeliverableList },
  CourseDescription: {
    screen: CourseDescriptionScreen,
    navigationOptions: (navData) => {
      return {
        title: `${navData.navigation.getParam("courseName")} Details`,
      };
    },
  },
  DeliverableDescription: {
    screen: DeliverableDescriptionScreen,
    navigationOptions: (navData) => {
      return {
        title: `${navData.navigation.getParam("deliverableName")} Details`,
      };
    },
  },
  DeliverableSubmetion: {
    screen: DeliverableSubmetionScreen,
    navigationOptions: (navData) => {
      return {
        title: `${navData.navigation.getParam(
          "delevrableName"
        )} ${navData.navigation.getParam("deliverableType")}`,
      };
    },
  },
  SearchReasult: ResultsNavigator,
});

export default HomeStack;
