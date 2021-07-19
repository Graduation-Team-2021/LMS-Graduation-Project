import React from "react";
import HomeScreenNavigator from "./HomeScreenNavigator";
import { createDrawerNavigator } from "react-navigation-drawer";
import ProfileNav from "./ProfileScreenNavigator";
import MsgsNavs from "./MessagesNavigator";
import Drawer from "../components/Drawer";
import ResetPasswordScreen from "./ResetPasswordScreenNavigator";
import RecentEventScreen from "./RecentEventNavigator";
import checkConnectivity from "../hocs/checkConnectivity";

const MainDrawer = createDrawerNavigator(
  {
    Home: HomeScreenNavigator,

    Profile: ProfileNav,
    Messenger: MsgsNavs,
    RecentEventScreen: { screen: checkConnectivity(RecentEventScreen) },
    ResetPassword: {
      screen: checkConnectivity(ResetPasswordScreen),
    },
  },
  {
    contentComponent: Drawer,
  }
);

export default MainDrawer;
