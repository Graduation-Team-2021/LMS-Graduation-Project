import React from "react";
import { View, FlatList, StyleSheet,Text } from "react-native";
import NotifactionListItem from "../components/NotifiactionList";

const DummyNotifiaction = [
    {}
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
