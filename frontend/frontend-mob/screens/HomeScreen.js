import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ANHeaderButton from "../components/ANHeaderButton";
import { Card, Button } from "react-native-elements";
import SwipeList from "../components/SwipList";
import Dismiss from "../components/Dismiss";
const HomeScreen = (props) => {
  let c = [];
  const groupflag = true;
  for (let index = 0; index < 10; index++) {
    c.push(<Text key={index}>Hello {index}</Text>);
  }
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>Courses you are enrolled in </Text>
        <SwipeList navigation={props.navigation} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            title="show all courses"
            containerStyle={{ margin: 5 }}
            onPress={() => props.navigation.navigate("CourseList")}
          />
          <Button
            title="show all Deliverables"
            containerStyle={{ margin: 5 }}
            onPress={() => props.navigation.navigate("DeliverableList")}
          />
        </View>
        <Text style={styles.title}>Your Groups</Text>
        <SwipeList navigation={props.navigation} groupflag={groupflag} />
        <Text style={styles.title}>Last Post</Text>
        <View style={{ height: 300, width: "100%" }}>
          <Dismiss>{c}</Dismiss>
        </View>
      </View>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={ANHeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
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
