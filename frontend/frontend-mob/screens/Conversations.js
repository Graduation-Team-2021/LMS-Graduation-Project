import React, { useState,useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import ANHeaderButton from "../components/ANHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ConversationCard from "../components/ConversationCard";
import {getAllConversations} from "../Interface/Interface";

const ConversationScreen = (props) => {
const [conversations, setConversations] = useState([]);
  

const getConversations = ()=>{
    getAllConversations(props.userData.Token).then((res) => {
  const temp = [];
  res.forEach((ele) => {
    let data = {
      id: ele["user"]["user_id"],
      name: ele["user"]["name"],
      message: ele["recent_message"],
      time: ele["sent_time"],
    };

    temp.push(data);
  });
  setConversations(temp);
  console.log("hi")
})
}

  useEffect(getConversations, [props.userData.Token]);
  
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const navigationHandler = (second_id) => {
    props.navigation.navigate({
      routeName: "Messages",
      params: {second_id:second_id}
    });
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView>
        {conversations.map((msg, i) => (
          <ConversationCard
            id={msg.id}
            data={msg}
            onClick={navigationHandler}
          ></ConversationCard>
        ))}
      </ScrollView>
    </View>
  );
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