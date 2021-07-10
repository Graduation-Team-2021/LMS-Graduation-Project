import React, { useState,useEffect } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Text,
    StyleSheet
  } from "react-native";
  import { FontAwesome } from '@expo/vector-icons';
  import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
  import { connect } from "react-redux";
  const DeliverableItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }
    const previewDeliverableHandler = () =>{
      props.previewDeliverableHandler(props.deliverable)
    }

    return(
      <View style={{marginLeft:15,flexDirection:'row',justifyContent : 'space-between',marginTop:10}}>
      <TouchableCmp onPress = {previewDeliverableHandler}>
      <View style={{flexDirection:'row'}}>
      <FontAwesome name="folder-open" size={20} style={{marginRight:6,opacity:0.7}}/>
      <Text>{props.deliverable.deliverable_name}</Text>
      </View>
      </TouchableCmp>
    </View>
    )
  }
  const styles = StyleSheet.create({
    iconStyle:{
      marginLeft:11,
      opacity:0.8
    },
    dividerStyle:{
      margin:20
    }
  });
  export default connect(mapStateToProps, mapDispatchToProps)(DeliverableItem);