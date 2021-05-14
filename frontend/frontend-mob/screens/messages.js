//This is an example of online Emulator by https://aboutreact.com
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions , ScrollView , Button, TouchableOpacity , TouchableNativeFeedback , Platform} from 'react-native';
import {
  Input,
  Image,
  Header,
  ListItem,
  Avatar,
  Text,
} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import MessageCard from "../components/MessageCard"



const MessagesScreen = props => {
  const user_data = props.navigation.state.params.user_data
  const msges = props.navigation.state.params.msges
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
  <View>
    <ScrollView>
      {msges.map((msg, i) => (
          <MessageCard key={msg.id} message={msg} user2_data={user_data} position={(msg.sender_id===user_data.id)?true:false}> </MessageCard>
      ))}
    </ScrollView>
    <View style={styles.SendMessageContainer}>
      <Input></Input>
      <TouchableCmp style={{marginTop:'5%'}}>
        <FontAwesome name="send" size={20}/>
      </TouchableCmp>
    </View>
  </View>

  
  );
};

const styles = StyleSheet.create({
  SendMessageContainer: {
    maxWidth: '85%',
    flexDirection:'row',
    marginLeft:'5%'
  }
});
MessagesScreen.navigationOptions = navigationData =>{
  const data = navigationData.navigation.getParam('user_data');
  return{
    headerTitle:data.name
  }
}

export default MessagesScreen;


