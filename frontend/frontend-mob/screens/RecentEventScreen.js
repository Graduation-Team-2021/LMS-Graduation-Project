import React from "react";
import { View, Text , FlatList } from "react-native";
import { ListItem, Avatar } from 'react-native-elements'
const RecentEventScreen = (props) => {
const list = [
  {event_name:"hahsdjhjsad",
  event_deadline: "sajkhsdakjha"}
]
  return (
    <FlatList
      keyExtractor={(item,index) => index.toString()}
      data={list}
      renderItem={(item) => 
        <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.item.event_name}</ListItem.Title>
          <ListItem.Subtitle>{item.item.event_deadline}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>}
    />
  );
};

export default RecentEventScreen;
