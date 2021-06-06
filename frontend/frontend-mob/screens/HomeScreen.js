import React, { useState, Fragment, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ANHeaderButton from "../components/ANHeaderButton";
import { Button, BottomSheet } from "react-native-elements";
import SwipeList from "../components/SwipList";
import Dismiss from "../components/Dismiss";
import SearchingButtomModal from "../components/searchingButtomModal";
const HomeScreen = (props) => {
  let c = [];
  const groupflag = true;
  for (let index = 0; index < 10; index++) {
    c.push(<Text key={index}>Hello {index}</Text>);
  }

  const [ButtomModalVisability, setButtomModalVisability] = useState(false);

  // useEffect(() => {
  //   props.navigation.setParams({
  //     showBottomModalSheet: () => setButtomModalVisability(true),
  //     studentName: props.userData.Name
  //   });
  // }, []);

  return (
    <Fragment>
      <BottomSheet
        isVisible={ButtomModalVisability}
        modalProps={{
          onRequestClose: () => setButtomModalVisability(false),
          hardwareAccelerated: true,
          transparent: true,
        }}
      >
        <SearchingButtomModal
          closeTheBottomSheet={() => setButtomModalVisability(false)}
          navigateToResults={(searchingQuery) => {
            setButtomModalVisability(false);
            props.navigation.navigate({
              routeName: "SearchReasult",
              params: { searchingQuery: searchingQuery },
            });
          }}
        />
      </BottomSheet>
      <ScrollView>
        <View style={styles.screen}>
          <Text style={styles.title}>Courses you are enrolled in </Text>
          <SwipeList navigation={props.navigation} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
    </Fragment>
  );
};

HomeScreen.navigationOptions = (navData) => {
  const showBottomModalSheet = navData.navigation.getParam(
    "showBottomModalSheet"
  );
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ANHeaderButton}>
        <Item
          title="search"
          iconName="ios-search"
          onPress={showBottomModalSheet}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
