import React from 'react';
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

const ConversationCard = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  let onClickHandler=()=>{
    props.onNavigation(props.data)
  }

  return (
    <TouchableCmp onPress={onClickHandler}>
      <View>
        <ListItem bottomDivider>
          <Avatar rounded source={{ uri: props.data.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title>{props.data.name}</ListItem.Title>
            <ListItem.Subtitle>
              <View style={styles.MessagesContainer}>
                <Text
                  style={styles.Messages}
                  numberOfLines={1}
                  >
                  {props.data.message}
                </Text>

                <Text style={styles.MessageTimeStamp}>
                  {' '}{props.data.time}
                   
                </Text>
              </View>
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableCmp>
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
export default ConversationCard;


