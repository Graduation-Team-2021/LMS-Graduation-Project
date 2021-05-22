import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import MessagesScreen from '../screens/messages'
import ConversationScreen from '../screens/Conversations'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: 'rgb(61, 109, 204)'
  },
  cardStyle: {
  backgroundColor: "transparent",
  opacity: 1
  },
  headerTintColor: 'white'
};

const MessagesNavigator = createStackNavigator(
  {
    Conversations:{
      screen:ConversationScreen,
    },
    Messages:{
      screen:MessagesScreen
      }
  },
    {
      defaultNavigationOptions: defaultStackNavOptions
    }
);

export default createAppContainer(MessagesNavigator);