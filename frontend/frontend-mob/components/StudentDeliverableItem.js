import React, { useState,useEffect } from "react";
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
  import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
  import { Ionicons,AntDesign,Entypo} from '@expo/vector-icons';
  import { connect } from "react-redux";

  const StudentDeliverableItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }
const StudentSubmissionHandler = () =>{
  props.StudentSubmissionHandler(props.studentDeliverable)
}
    return(
      
      <View style={{flexDirection:"row",alignItems:"center",paddingRight:10}}>
        <TouchableCmp style={{flexDirection:"row"}} onPress={StudentSubmissionHandler}>
          <Ionicons name="person" size={17} style={{marginHorizontal:9}}></Ionicons>
          <Text style={{fontSize:17}}>{props.studentDeliverable.name}</Text> 
        </TouchableCmp> 
          <View style={{alignItems:"center",marginLeft:"auto"}}> 
            <AntDesign name={props.studentDeliverable.mark?"checkcircle":"closecircle"} size={20} color={props.studentDeliverable.mark?"green":"red"}></AntDesign>
            <Text>{props.studentDeliverable.mark?"marked":"not marked"}</Text>
          </View>
      </View>   
      
    )
  }
  const styles = StyleSheet.create({
    iconStyle:{
      marginLeft:11
    },
    dividerStyle:{
      margin:20
    }
  });
  export default connect(mapStateToProps, mapDispatchToProps)(StudentDeliverableItem);