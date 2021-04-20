//This is an example of online Emulator by https://aboutreact.com
import React, { useState } from 'react';
import { View, StyleSheet, Button, Dimensions , ScrollView , TouchableOpacity , TouchableNativeFeedback , Platform} from 'react-native';
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
    name: 'Amy Farha',
    avatar_url:
      'https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png',
    subtitle: 'Hello world this is Amy Farha',
    time: '5m'
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    subtitle: 'Hello world this is Chris Jackson.',
    time: '1h'
  },
  {
    name: 'Amy Sue',
    avatar_url:
      'https://i.pinimg.com/originals/61/45/af/6145af6a7aff43b826f2ececb11f5be3.jpg',
    subtitle: 'Hello world this is Amy Sue',
    time: '3h'
  },
 
];

const ConversationScreen = () => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View>
      <Header
        leftComponent={<Ionicons name="md-menu" size={32} color="white" />}
        centerComponent={
          <Text h4 style={{ color: 'white' }}>
            Messages
          </Text>
        }
        outerContainerStyles={{ backgroundColor: '#324C66' }}
        containerStyle={{
          backgroundColor: '#3D6DCC',
          justifyContent: 'end',
        }}
      />
    <ScrollView>
      {list.map((l, i) => (
        <TouchableCmp>
        <ListItem key={i} bottomDivider>
          <Avatar rounded source={{ uri: l.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>
              <View style={styles.MessagesContainer}>
                <Text
                  style={styles.Messages}
                  numberOfLines={1}
                  ellipsizeMode="end">
                  {l.subtitle}
                </Text>

                <Text style={styles.MessageTimeStamp}>
                  {' '}{l.time}
                   
                </Text>
              </View>
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        </TouchableCmp>
      ))}
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  Messages: {
    color: 'gray',
    maxWidth: '85%',
  },
  MessageTimeStamp: {
    color: 'gray',
  },
  MessagesContainer: {


    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'flex-start',
  }
});
export default ConversationScreen;


