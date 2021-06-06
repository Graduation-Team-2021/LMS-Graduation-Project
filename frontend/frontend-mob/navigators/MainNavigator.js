import React from "react";
import HomeScreenNavigator from "./HomeScreenNavigator";
import { createDrawerNavigator } from "react-navigation-drawer";
import ProfileNav from "./ProfileScreenNavigator";
import MsgsNavs from "./MessagesNavigator";
import Drawer from "../components/Drawer";

const MainDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreenNavigator,
        navigationOptions: (navOption)=>{
            console.log(navOption.navigationOptions)
            return {title: navOption.navigation.getParam('studentName')}
        }
    },
    Profile: ProfileNav,
    Messenger: MsgsNavs,
  },
  {
    contentComponent: Drawer,
  }
);

export default MainDrawer;
