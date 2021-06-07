//This is an example of online Emulator by https://aboutreact.com
import React, { useState ,useEffect,useRef} from 'react';
import { View,InputText, StyleSheet, KeyboardAvoidingView,Dimensions , ScrollView , Button, TouchableOpacity , TouchableNativeFeedback , Platform} from 'react-native';
import {
  Input
} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import MessageCard from "../components/MessageCard"
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import {getAllMessages,sendMessage} from "../Interface/Interface";
import { Header } from 'react-navigation-stack';

const MessagesScreen = props => {
  const [messages, setMessages] = useState([]);
  const [sentMessage, setSentMessage] = useState("");
  const input = React.createRef();
  const scrollViewRef = useRef();

  const second_user = props.navigation.state.params.second_id

  const sendMessageHandler = () => {
  if(sentMessage == "") {
    return 0;
  }
  input.current.clear();
  let Time = new Date();
  sendMessage(props.userData.Token, second_user, {
    text: sentMessage,
    sent_time: `${Time.toISOString().slice(0, 10)} ${Time.toISOString().slice(11, 19)}`
  }); 
  setMessages([...messages,sentMessage])
  setSentMessage("")
  }
const getMessages = () =>{
  const second_id = props.navigation.state.params.second_id
  getAllMessages(props.userData.Token, second_id).then(res => {
      const temp = []
      res.forEach(
        (ele, index) => {
          let time = ele['sent_time']
          let timestamp = new Date(time)
          temp.push({
            id: ele['message_id'],
            sender_id: ele['sender_id'],
            text: ele['text'],
          })
        }
      )
      setMessages(temp)
  });}

  useEffect(getMessages, [props.userData.Token]);
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
  <View style={styles.container}>
    <View style={styles.contentContainer}>
      <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {messages.map((msg, i) => (
            <MessageCard key={msg.id} message={msg.text} position={(msg.sender_id===props.userData.Token)?true:false}> </MessageCard>
        ))}
      </ScrollView>
    </View>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  keyboardVerticalOffset = {Header.HEIGHT + 20} // adjust the value here if you need more padding
  >
    <View style={styles.SendMessageContainer}>
      <Input  ref={input} onChangeText={(text) => setSentMessage({text})} onPress={sendMessageHandler}/>
      <TouchableCmp style={{marginTop:'5%'}} onPress = {sendMessageHandler}>
        <FontAwesome name="send" size={20}/>
      </TouchableCmp>
    </View>
    </KeyboardAvoidingView>
  </View>

  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  SendMessageContainer: {
    maxWidth: '85%',
    flexDirection:'row',
    marginLeft:'5%'
  }
});




export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);


