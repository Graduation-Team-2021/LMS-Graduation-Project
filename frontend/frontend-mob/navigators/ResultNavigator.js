import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import UsersSearchResult from "../screens/UsersSearchResult";
import CoursesSearchResult from "../screens/CoursesSearchResult";
import GroupsSearchResult from "../screens/GroupSearchResult";
import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";

const tabnav = createMaterialBottomTabNavigator(
  {
    Users: {
      screen: UsersSearchResult,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <AntDesign name="user" size={24} color={tabInfo.tintColor} />
        ),
        tabBarColor: "red",
      },
    },
    Courses: {
      screen: CoursesSearchResult,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <Entypo name="book" size={24} color={tabInfo.tintColor} />
        ),
        tabBarColor: "green",
      },
    },
    Groups: {
      screen: GroupsSearchResult,
      navigationOptions: {
        tabBarIcon: (tabInfo) => (
          <MaterialIcons name="groups" size={24} color={tabInfo.tintColor} />
        ),
        tabBarColor: "blue",
      },
    },
  },
  { activeColor: "white", shifting: true }
);


export default tabnav;
