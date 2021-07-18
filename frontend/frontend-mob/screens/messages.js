//This is an example of online Emulator by https://aboutreact.com
import React, { useState ,useEffect,useRef} from 'react';
import { View, StyleSheet, KeyboardAvoidingView , ScrollView, TouchableOpacity , TouchableNativeFeedback , Platform} from 'react-native';
import {
  Input
} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import MessageCard from "../components/MessageCard"
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import {getAllMessages,sendMessage} from "../Interface/Interface";
import { HeaderHeightContext } from 'react-navigation-stack';
import msngrskt from "../sockets/msngrskts";

const MessagesScreen = props => {
  const [messages, setMessages] = useState([]);
  const [sentMessage, setSentMessage] = useState();
  const [newMessage, setNewMessage] = useState(null);
  const input = React.createRef();
  const scrollViewRef = useRef();

  const second_user = props.navigation.state.params.second_id

  useEffect(() => {
    msngrskt.on("private message", (res) => setNewMessage(res));
  }, [])

  useEffect(() => {
    if (newMessage && newMes.from === props.userData.ID) {
      const Temp = [...messages, {
        id: newMessage.length,
        sender_id: newMessage.from,
        text: newMessage,
        time: new Date(newMessage.content.sent_time).getTime()
      }]
      setMessages(Temp)
    }
  }, [newMessage, props.Current])

  const sendMessageHandler = () => {
  if(sentMessage == "") {
    return 0;
  }
  input.current.clear();
  let Time = new Date();
  sendMessage(props.userData.Token, second_user, {
    text: sentMessage.text,
    sent_time: `${Time.toISOString().slice(0, 10)} ${Time.toISOString().slice(11, 19)}`,
    sender_id: props.userData.ID
  }); 
  setMessages([...messages,sentMessage])
  setSentMessage()
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
            time: timestamp
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
            <MessageCard key={msg.id} message={msg.text} position={(msg.sender_id===props.userData.ID)?false:true}> </MessageCard>
        ))}
      </ScrollView>
    </View>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  keyboardVerticalOffset = {HeaderHeightContext + 20} // adjust the value here if you need more padding
  >
    <View style={styles.SendMessageContainer}>
      <Input  ref={input} onChangeText={(text) => setSentMessage({"text":text,"sender_id":props.userData.ID})} onPress={sendMessageHandler}/>
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


