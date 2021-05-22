import React from 'react';

import {createAppContainer} from 'react-navigation'

import HomeScreenNavigator from './HomeScreenNavigator'

import { createDrawerNavigator } from 'react-navigation-drawer';
import ProfileNav from './ProfileScreenNavigator'
import MsgsNavs from './MessagesNavigator'

const MainDrawer = createDrawerNavigator({
    Home:HomeScreenNavigator,
    Profile:ProfileNav,
    Messenger:MsgsNavs
})

export default createAppContainer(MainDrawer)