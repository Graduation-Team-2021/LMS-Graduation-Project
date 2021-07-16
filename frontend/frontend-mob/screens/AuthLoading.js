import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import * as SQLite from "expo-sqlite";
import {CreateTable} from '../Interface/sqllite'

const AuthLoadingScreen = (props) => {
  const bootStrapAsync = () => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        AsyncStorage.getItem("name").then((name) => {
          props.userDataActions.onSetData({
            Token: token,
            Name: name,
            ID: jwt_decode(token).id,
            Role: jwt_decode(token).permissions,
          });
          props.navigation.navigate({
            routeName: "MainNavigator",
            params: {
              routeName: "Home",
              params: { studentName: name },
            },
          });
        });
      } else {
        props.navigation.navigate("Login");
      }
    });
    CreateTable();
  };
  useEffect(() => bootStrapAsync(), []);
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
