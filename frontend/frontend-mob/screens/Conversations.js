import React, { useState } from 'react';
import { View, StyleSheet, Button, Dimensions , ScrollView , TouchableOpacity , TouchableNativeFeedback , Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ConversationCard from '../components/ConversationCard';
import {
  Input,
  Image,
  Header,
  ListItem,
  Avatar,
  Text,
} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const list = [
  {
    id: 1,
    name: 'Amy Farha',
    avatar_url:
      'https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png',
    message: 'Hello world this is Amy Farha',
    time: '5m'
  },
  {
    id:3,
    name: 'Chris Jackson',
    avatar_url:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    message: 'Hello world this is Chris Jackson.',
    time: '1h'
  },
  {
    id:5,
    name: 'Amy Sue',
    avatar_url:
      'https://i.pinimg.com/originals/61/45/af/6145af6a7aff43b826f2ececb11f5be3.jpg',
    message: 'Hello world this is Amy Sue',
    time: '3h'
  },
  
 
];

const ConversationScreen = props => {

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  
  const navigationHandler = (data) =>{
    const user_id = data.id;
    //get request to conversation between users using id and current user id
    const messages= [
                        {
                            "message_id": 8,
                            "receiver_id": 2,
                            "receiver_name": "steve",
                            "sender_id": 3,
                            "sender_name": "bob",
                            "sent_time": '2010-10-10 4:20:15',
                            "text": "Hello World!"
                        },
                        {
                            "message_id": 9,
                            "receiver_id": 3,
                            "receiver_name": "steve",
                            "sender_id": 2,
                            "sender_name": "bob",
                            "sent_time": "1996-10-10 21:53:30",
                            "text": "Hey"
                        },
                        {
                            "message_id": 9,
                            "receiver_id": 2,
                            "receiver_name": "steve",
                            "sender_id": 3,
                            "sender_name": "bob",
                            "sent_time": "1996-10-10 21:53:30",
                            "text": "Farewell."
                        }
                    
                  ];
                          
  props.navigation.navigate({routeName:"Messages",params:{user_data:data,msges:messages}});
  };

  return (
    <View style={{backgroundColor:'white'}}>
    <ScrollView>
      {list.map((msg, i) => (
          <ConversationCard key={msg.id} data={msg} onNavigation={navigationHandler}></ConversationCard>
      ))}
    </ScrollView>
  </View>
  );
};


export default ConversationScreen;


