import React, { useState, useEffect, Fragment } from "react";
import { View, ScrollView, Text } from "react-native";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import ANHeaderButton from "../components/ANHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ConversationCard from "../components/ConversationCard";
import { getAllConversations, getUser } from "../Interface/Interface";
import msngrskt from "../sockets/msngrskts";

const ConversationScreen = (props) => {
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [InternetConnectionState, setInternetConnectionState] = useState(true);
  useEffect(() => {
    const setConnectivity = (newState) =>
      setInternetConnectionState(
        newState.isConnected && newState.isInternetReachable
      );
    NetInfo.addEventListener(setConnectivity);
    msngrskt.auth = { userID: props.userData.ID };
    msngrskt.connect();
  }, []);

  useEffect(() => {
    msngrskt.on("private message", (res) => setNewMessage(res));
  }, []);

  useEffect(() => {
    if (newMessage) {
<<<<<<< HEAD
      let user = {};
      getUser(newMessage.from).then((res) => {
        user["id"] = res.user_id;
        user["name"] = res.name;
        user["photo"] = res.photo;
      });
      user["text"] = newMessage.content.text;
      let temp = [user, ...conversations];
      setConversations(temp);
    }
    conversations.sort(function (a, b) {
      return new Date(b.sent_time) - new Date(a.sent_time);
    });
=======
      let res = newMessage;
      let user = null;
      for (let index = 0; index < conversations.length; index++) {
        if (conversations[index].ID === res.from) {
          user = conversations[index];
          conversations.splice(index, 1);
          break;
        }
      }
      if (user) {
        user["text"] = res.content.text;
        let temp = [user, ...conversations];
        setConversations(temp);
        setNewMessage(null);
      }
      else {
        getUser(newMessage.from).then((res) => {
          console.log(res)
          let userino = {
            ID: res.user_id,
            name: res.name,
            text: newMessage.content.text,
          }
          let temp = [userino, ...conversations];
          setConversations(temp);
          setNewMessage(null);
        })
      }
    }
>>>>>>> d5f7d0f6528e6a956e64748ef8a85e7a1c34a2f1
  }, [newMessage]);

  const getConversations = () => {
    getAllConversations(props.userData.Token).then((res) => {
      const temp = [];
      res.forEach((ele) => {
        let data = {
          id: ele["user"]["user_id"],
          name: ele["user"]["name"],
          message: ele["recent_message"],
          time: ele["sent_time"].replace("T", " ").replace("Z", " "),
        };

        temp.push(data);
      });
      setConversations(temp);
    });
  };

  useEffect(getConversations, [props.userData.Token]);

  const navigationHandler = (second_id) => {
    props.navigation.navigate({
      routeName: "Messages",
      params: { second_id: second_id },
    });
  };

  let content = (
    <Text>Showing messeging while offline mode is not supported</Text>
  );

  if (InternetConnectionState) {
    content = (
      <ScrollView>
        {conversations.map((msg, i) => (
          <ConversationCard
            id={msg.id}
            data={msg}
            onClick={navigationHandler}
            key={i}
          ></ConversationCard>
        ))}
      </ScrollView>
    );
  }

  return content;
};
ConversationScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={ANHeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);
