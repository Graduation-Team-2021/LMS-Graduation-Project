import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/ProfileScreen";
const ProfileNavigator = createStackNavigator({
  Profile: { screen: ProfileScreen },
});

export default ProfileNavigator
