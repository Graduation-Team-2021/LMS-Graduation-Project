import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";

const CourseListItem = ({ Notifaction }) => {
  //console.log(Notifaction);
  return (
    <View style={{ margin: 10 }}>
      <TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: Notifaction.coursePicURI,
            }}
          />
          <View style={{justifyContent: "center",padding:15}}>
            <Text>{Notifaction.EventUser}</Text>
            <Text>{Notifaction.EventName}</Text>
            <Text>{Notifaction.EventDescription}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CourseListItem;
