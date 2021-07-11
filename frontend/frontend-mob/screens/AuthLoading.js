import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("LMS.db");

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
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS answers(answer_id INTEGER PRIMARY KEY,answer TEXT NOT NULL, question_id INTEGER NOT NULL, FOREIGN KEY(question_id) REFERENCES questions(question_id) ON DELETE CASCADE ON UPDATE CASCADE);",
        [],
        (_, res) => {
          console.log("[creating answers table is done with result]", res);
        },(_,err)=>{console.log('[creating answers table failed with error',err)}
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS exams(exam_id INTEGER PRIMARY KEY,answer TEXT NOT NULL, question_id INTEGER NOT NULL, FOREIGN KEY(question_id) REFERENCES questions(question_id) ON DELETE CASCADE ON UPDATE CASCADE);",
        [],
        (_, res) => {
          console.log("[creating answers table is done with result]", res);
        },(_,err)=>{console.log('[creating answers table failed with error',err)}
      );
    });
  };
  useEffect(() => bootStrapAsync(), []);
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
