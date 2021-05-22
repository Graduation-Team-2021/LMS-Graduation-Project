import React from 'react';

import {createAppContainer} from 'react-navigation'

import HomeScreenNavigator from './HomeScreenNavigator'

import { createDrawerNavigator } from 'react-navigation-drawer';
import ProfileScreen from '../screens/ProfileScreen'
import MsgsNavs from './MessagesNavigator'

const MainDrawer = createDrawerNavigator({
    Home:HomeScreenNavigator,
    Profile:ProfileScreen,
    Messenger:MsgsNavs
})

export default createAppContainer(MainDrawer)