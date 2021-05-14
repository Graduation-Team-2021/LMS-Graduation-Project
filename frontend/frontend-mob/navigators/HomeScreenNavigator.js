import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import CourseScreen from "../screens/CourseScreen";

const studentName = "Ibrahim";

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { title: `${studentName}` } },
  Course:{screen: CourseScreen, navigationOptions:(navData)=>{
      return{
          title: `${navData.navigation.getParam('courseName')}`
      }
  } }
});

export default createAppContainer(HomeStack);
