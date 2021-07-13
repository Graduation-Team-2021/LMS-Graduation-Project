import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
  StyleSheet,
  Alert
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import { Entypo} from '@expo/vector-icons';
const DeliverableItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const previewDeliverableHandler = () => {
    props.previewDeliverableHandler(props.deliverable);
  };
  const deleteDeliverableHandler = () =>{
    props.deleteDeliverableHandler(props.deliverable.id)
  }
  const deleteAlertHandler = () => {
    Alert.alert("Delete Deliverable ","Are you sure you want to delete " +props.deliverable.deliverable_name+"?",
    [{ text: "Cancel", onPress:()=>{},style:"cancel"},
    {text:"Confirm",onPress:deleteDeliverableHandler},
    ])
  }

  return (
    <View
      style={{
        marginLeft: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      
        <View style={{ flexDirection: "row",width:"95%"}}>
        <TouchableCmp onPress = {previewDeliverableHandler} style={{flexDirection:"row"}}>
            <FontAwesome
              name="folder-open"
              size={20}
              style={{ marginRight: 6, opacity: 0.7 }}
            />
            <Text>
              {props.deliverable.deliverable_name}
            </Text>
          </TouchableCmp>
          {props.userData.Role=="professor"&&(
          <TouchableCmp style={{marginLeft:"auto"}} onPress={deleteAlertHandler}>
            <Entypo name="circle-with-cross" size={20} color="red" style={{marginLeft:"auto"}}/>
          </TouchableCmp>)}
        </View>

      
    </View>
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    marginLeft: 11,
    opacity: 0.8,
  },
  dividerStyle: {
    margin: 20,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(DeliverableItem);
