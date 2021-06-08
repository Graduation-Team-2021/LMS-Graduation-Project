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
  const VideoItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }
    const previewVideoHandler = () =>{
      props.previewVideoHandler(props.video.material_id)
    }

    const downloadVideoHandler = () =>{
      props.downloadVideoHandler(props.video.material_id)
    }
    return(
      <View style={{marginLeft:15,flexDirection:'row',justifyContent : 'space-between',marginTop:10}}>
      <View style={{flexDirection:'row'}}>
      <FontAwesome name="file-video-o" size={20} style={{marginRight:6}}/>
        <Text>{props.video.material_name}{props.video.material_type}</Text>
      </View>
      <View style={{flexDirection:'row',marginRight:12}}>
        <TouchableCmp onPress = {previewVideoHandler}>
          <FontAwesome name="eye" size={20} style={styles.iconStyle}/>
        </TouchableCmp>
        <TouchableCmp onPress = {downloadVideoHandler}>
          <FontAwesome name="download" size={20} style={styles.iconStyle}/>
        </TouchableCmp>
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