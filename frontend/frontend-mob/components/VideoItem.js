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
  import { FontAwesome } from '@expo/vector-icons';
  import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
  import { Entypo} from '@expo/vector-icons';
  import { connect } from "react-redux";
  const VideoItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }
    const previewVideoHandler = () =>{
      props.previewVideoHandler(props.video.material_id)
    }
    const deleteMaterialHandler = ()=>{
      props.deleteMaterialHandler(props.video.material_id)
    }
    const deleteAlertHandler = () => {
      Alert.alert("Delete Video ","Are you sure you want to delete " +props.video.material_name+"?",
      [{ text: "Cancel", onPress:()=>{},style:"cancel"},
      {text:"Confirm",onPress:deleteMaterialHandler},
      ])
    }

    return(
      <View style={{marginLeft:15,flexDirection:'row',justifyContent : 'space-between',marginTop:10}}>
      
      <View style={{ flexDirection: "row",width:"95%"}}>
        <TouchableCmp onPress = {previewVideoHandler} style={{flexDirection:"row"}}>
          <FontAwesome name="file-video-o" size={20} style={{marginRight:6}}/>
          <Text>{props.video.material_name}{props.video.material_type}</Text>
        </TouchableCmp>
        {props.userData.Role=="professor"&&(
        <TouchableCmp style={{marginLeft:"auto"}} onPress={deleteAlertHandler}>
          <Entypo name="circle-with-cross" size={20} color="red"/>
        </TouchableCmp>)}
          
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
  export default connect(mapStateToProps, mapDispatchToProps)(VideoItem);