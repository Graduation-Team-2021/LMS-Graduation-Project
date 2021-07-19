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
import ForeignProfileScreen from "../screens/ForeignProfileScreen";
import ResultsNavigator from "./ResultNavigator";
import PdfReader from "../screens/PDFScreen";
import CreateDeliverable from "../screens/CreateDeliverable";
import checkConnectivity from "../hocs/checkConnectivity";
import StudentSubmissionScreen from "../screens/StudentSubmissionScreen";
import AddCourse from "../screens/AddCourse";
import AddUser from "../screens/AddUser";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: checkConnectivity(HomeScreen),
      navigationOptions: (navData) => {
        let studentName = navData.navigation.getParam("studentName");
        return {
          title: studentName,
        };
      },
    },
    CreateDeliverable: {
      screen: checkConnectivity(CreateDeliverable),
      navigationOptions: (navData) => {
        return {
          title: "Deliverable Form",
        };
      },
    },
    Course: {
      screen: checkConnectivity(CourseScreen),
      navigationOptions: (navData) => {
        return {
          title: `${navData.navigation.getParam("course").CourseName}`,
        };
      },
    },
    Video: { screen: VideoScreen },
    StudentSubmission: { screen: StudentSubmissionScreen },
    Pdf: { screen: PdfReader },
    CourseList: { screen: checkConnectivity(CourseListScreen) },
    DeliverableList: { screen: checkConnectivity(DeliverableList) },
    CourseDescription: {
      screen: CourseDescriptionScreen,
      navigationOptions: (navData) => {
        return {
          title: `${navData.navigation.getParam("courseName")} Details`,
        };
      },
    },
    DeliverableDescription: {
      screen: checkConnectivity(DeliverableDescriptionScreen),
      navigationOptions: (navData) => {
        return {
          title: `${navData.navigation.getParam("deliverable_name")} Details`,
        };
      },
    },
    DeliverableSubmission: {
      screen: checkConnectivity(DeliverableSubmetionScreen),
      navigationOptions: (navData) => {
        return {
          title: `${navData.navigation.getParam(
            "delevrableName"
          )} ${navData.navigation.getParam("deliverableType")}`,
        };
      },
    },
    ForeignProfile: { screen: checkConnectivity(ForeignProfileScreen) },
    SearchReasult: checkConnectivity(ResultsNavigator),
    AddCourse: checkConnectivity(AddCourse),
    AddUser: checkConnectivity(AddUser),
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "rgb(61, 109, 204)",
      },
      cardStyle: {
        backgroundColor: "transparent",
        opacity: 1,
      },
      headerTintColor: "white",
    },
  }
);

export default HomeStack;
