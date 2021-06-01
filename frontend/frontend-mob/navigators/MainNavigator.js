import React from 'react';
import HomeScreenNavigator from './HomeScreenNavigator'
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProfileNav from './ProfileScreenNavigator'
import MsgsNavs from './MessagesNavigator'
import Drawer from '../components/Drawer'

const MainDrawer = createDrawerNavigator({
    Home:HomeScreenNavigator,
    Profile:ProfileNav,
    Messenger:MsgsNavs
},{
    contentComponent:Drawer
})

export default MainDrawer