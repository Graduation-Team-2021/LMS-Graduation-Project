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
  }, []);
  msngrskt.auth = { userID: props.userData.ID };
  msngrskt.connect();

  useEffect(() => {
    msngrskt.on("private message", (res) => setNewMessage(res));
  }, []);

  useEffect(() => {
    if (newMessage) {
      let user = {};
      getUser(newMessage.from).then((res) => {
        user["id"] = res.user_id;
        user["name"] = res.name;
      })
      user["message"] = newMessage.content.text;
      user["time"] = newMessage.sent_time;
      let temp = [user, ...conversations];
      setConversations(temp);
    }
    conversations.sort(function (a, b) {
      return new Date.parse(b.sent_time) - new Date.parse(a.sent_time);
    });
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
