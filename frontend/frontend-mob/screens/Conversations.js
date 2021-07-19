import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import ANHeaderButton from "../components/ANHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ConversationCard from "../components/ConversationCard";
import { getAllConversations } from "../Interface/Interface";
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
    return () => {
      NetInfo.removeEventListener(setConnectivity);
    };
  }, []);
  msngrskt.auth = { userID: props.userData.ID };
  msngrskt.connect();

  useEffect(() => {
    msngrskt.on("private message", (res) => setNewMessage(res));
  }, []);

  useEffect(() => {
    if (newMessage) {
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
      } else {
        for (let index = 0; index < Users.length; index++) {
          if (Users[index].ID === res.from) {
            user = Users[index];
            break;
          }
        }
        user["text"] = res.content.text;
        let temp = [user, ...conversations];
        setConversations(temp);
      }
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
      console.log("hi");
    });
  };

  useEffect(getConversations, [props.userData.Token]);
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

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

  return <View style={{ backgroundColor: "white", flex: 1 }}>{content}</View>;
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
