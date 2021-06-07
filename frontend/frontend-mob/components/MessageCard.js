import React from 'react';
import { View, StyleSheet, Button, Dimensions , ScrollView , TouchableOpacity , TouchableNativeFeedback , Platform} from 'react-native';
import {
  Input,
  Image,
  Header,
  ListItem,
  Avatar,
  Text,
  Badge
} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const ConversationCard = (props, route, navigation)  => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (

    (props.position)?
    <TouchableCmp key={props.key} >
      <View>
        <ListItem>
          {/* <Avatar rounded source={{ uri: props.user2_data.avatar_url }} /> */}
          <ListItem.Content>
            <ListItem.Title>
              <View style={{justifyContent: 'flex-start',
    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.5}}>
                <Text style={styles.Messages2}>
                  {props.message}
                </Text>

              </View>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableCmp>
    :
    <TouchableCmp>
      <View>
        <ListItem>
          <ListItem.Content >
            <ListItem.Title>
              <View style={{justifyContent: 'flex-end',
    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.1}}>
                <Text style={styles.Messages1}>
                  {props.message}
                </Text>
              </View>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableCmp>
  );
  
};

const styles = StyleSheet.create({
  Messages1: {
    maxWidth: '100%',
    fontSize: 15,
    backgroundColor:'rgb(120,201,195)',
    color:'white',
    padding:14,
    borderRadius: 10,
    overflow: 'hidden'
  },
  Messages2: {
    maxWidth: '100%',
    fontSize: 15,
    backgroundColor:'rgb(134,175,205)',
    color:'white',
    padding:14,
    borderRadius: 11,
    overflow:'hidden'
  }
});
export default ConversationCard;


