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
import CoursePDFScreen from "../screens/CoursePDFScreen";
import CourseVideoScreen from "../screens/CoruseVideoScreen";
import CreateQuizScreen from "../screens/CreateQuizScreen";

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
    DeliverableList: {
      screen: checkConnectivity(DeliverableList),
      navigationOptions: (navData) => {
        const myCourse = navData.navigation.getParam("course");
        if (myCourse) {
          return { title: `${myCourse.CourseName} Deliverable` };
        } else {
          return { title: "Your Deliverable" };
        }
      },
    },
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
    },
    ForeignProfile: { screen: ForeignProfileScreen },
    SearchReasult: ResultsNavigator,
    AddCourse: checkConnectivity(AddCourse),
    AddUser: checkConnectivity(AddUser),
    CoursePDFs: { screen: checkConnectivity(CoursePDFScreen) },
    CourseVideos: { screen: checkConnectivity(CourseVideoScreen) },
    CreateQuiz: {
      screen: checkConnectivity(CreateQuizScreen),
      navigationOptions: (navData) => {
        const Course = navData.navigation.getParam("course");
        const isQuiz = navData.navigation.getParam("isQuiz");
        let type = "Delverable";
        if (isQuiz) {
          type = "Quiz";
        }
        return {
          title: `Create ${type} for ${Course.CourseName} `,
        };
      },
    },
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
