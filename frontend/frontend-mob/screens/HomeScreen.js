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
import * as Interface from "../Interface/Interface";
import { setCourse } from "../Models/Course";
import { setGroup } from "../Models/Group";
import { setFullPost } from "../Models/Post";
import AdminHomeScreen from "./AdminHomeScreen";
import NormalHomeScreen from "./NormalHomeScreen"



const HomeScreen = (props) => {
  if(props.userData.Role==='admin'){
    return <AdminHomeScreen {...props} />
  }
  return <NormalHomeScreen {...props} />;
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
