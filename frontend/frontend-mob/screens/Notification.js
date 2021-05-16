import React from "react";
import { View, FlatList, StyleSheet,Text } from "react-native";
import NotifactionListItem from "../components/NotifiactionList";

const DummyNotifiaction = [
    {
        EventUser:"HEma",
        EventName: "Deepwebish Course Three",
        EventDescription: "The Discription of Deepwebish Course Three",
        EventURI: "https://images7.alphacoders.com/303/303155.jpg",
      },
      {
        EventUser:"david",
        EventName: "Deepwebish Course Three",
        EventDescription: "The Discription of Deepwebish Course Three",
        EventURI: "https://images7.alphacoders.com/303/303155.jpg",
      },
      {
        EventUser:"adham",
        EventName: "Deepwebish Course Three",
        EventDescription: "The Discription of Deepwebish Course Three",
        EventURI: "https://images7.alphacoders.com/303/303155.jpg",
      }
];

const AllNOtifactionList = (props) => {
  const renderItem = ({ item }) => {
    return <NotifactionListItem Notifaction={item} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={DummyNotifiaction}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AllNOtifactionList;
