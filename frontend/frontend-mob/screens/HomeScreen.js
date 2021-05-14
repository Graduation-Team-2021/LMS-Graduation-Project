import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import SwipeList from "../components/SwipList";
import Dismiss from "../components/Dismiss";
const HomeScreen = (props) => {
  let c = [];
  for (let index = 0; index < 10; index++) {
    c.push(<Text key={index}>Hello {index}</Text>);
  }
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>Courses you are enrolled in </Text>
        <SwipeList navigation={props.navigation} />
        <Text style={styles.title}>Your Groups</Text>
        <SwipeList navigation={props.navigation} />
        <Text style={styles.title}>Last Post</Text>
        <View style={{ height: 300, width: "100%" }}>
          <Dismiss>{c}</Dismiss>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
