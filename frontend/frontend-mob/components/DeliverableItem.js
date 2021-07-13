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
import { Entypo,AntDesign} from '@expo/vector-icons';
const DeliverableItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const previewDeliverableHandler = () => {
    props.previewDeliverableHandler(props.deliverable);
  };
  const deleteDeliverableHandler = () =>{
    props.deleteDeliverableHandler(props.deliverable.deliverable_id)
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
        marginTop: 10,
      }}
    >
      
        <TouchableCmp onPress = {previewDeliverableHandler} style={{flexDirection:"row"}}>
            <FontAwesome
              name="folder-open"
              size={20}
              style={{ marginRight: 6, opacity: 0.7 }}
            />
            <Text style={{width:"60%"}}>
              {props.deliverable.deliverable_name}
            </Text>
          </TouchableCmp>
          <View style={{flexDirection:"row",alignItems:"center"}}>
          {props.userData.Role!="professor"&&(
          <View style={{flexDirection:"column",alignItems:"center",width:"53%"}}>
          <AntDesign size={20} color={props.deliverable.status=="delivered"?"orange":props.deliverable.status=="finished"?"green":"red"}name={props.deliverable.status=="missing"?"closecircle":"checkcircle"}></AntDesign>
          <Text>{props.deliverable.status}</Text>
          </View>)}
          {props.userData.Role=="professor"&&(
          <TouchableCmp  onPress={deleteAlertHandler} style={styles.iconStyle}>
            <Entypo name="circle-with-cross" size={20} color="red"/>
          </TouchableCmp>)}
          </View>
            
          
    </View>
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    marginLeft: "auto",
    opacity: 0.8,
  },
  dividerStyle: {
    margin: 20,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(DeliverableItem);
