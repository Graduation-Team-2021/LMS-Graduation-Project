import React from "react";
import { View, Text, StyleSheet , FlatList } from "react-native";
import { Card, Button } from "react-native-elements";

import Post from "../components/Post"

import About from '../components/About'
import NewPost from "../components/NewPost";

const data = [ "sklahjdlsa" , "sakjhkjsdah" ,"sakjhkjsdah" ,"sakjhkjsdah" ,"sakjhkjsdah" , "kjasdhdsajk"]

const CourseScreen = (props) => {
  const renederitem = (itemdata) => {
    if(itemdata.index === 0){
      return <NewPost />
    }
    return <Post/>
  } 
  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <About />
        <View>
          <Button
            title="Videos"
            type="outline"
            containerStyle={styles.buttonContainer}
          />
          <Button title="PDFs" containerStyle={styles.buttonContainer} />
        </View>
      </View>
      <View style={{width:"90%" , flex:1}}>
      <FlatList
      data = {data}
      renderItem = {renederitem}

      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
  },
  buttonContainer: {
    paddingVertical: 5,
  },
});

export default CourseScreen;
