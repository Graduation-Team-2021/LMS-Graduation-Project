import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Avatar } from "react-native-elements";

const DeliverableItem = (props) => {
  const Deliverable = props.Deliverable;
  const navigation = props.navigation;
  return (
    <View style={{ margin: 10 }}>
      <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate({
          routeName: "DeliverableDescription",
          params: { deliverableName: Deliverable.name, Deliverable: Deliverable },
        })
      }
      >
        <View style={{ flexDirection: "row" }}>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri: Deliverable.coursePicURI,
            }}
          />
          <View style={{ justifyContent: "center", padding: 15 }}>
            <Text>{Deliverable.name}</Text>
            <Text>{Deliverable.type}</Text>
            <Text>{Deliverable.course}</Text>
            <Text>Deadline: {Deliverable.deadline}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default DeliverableItem;
