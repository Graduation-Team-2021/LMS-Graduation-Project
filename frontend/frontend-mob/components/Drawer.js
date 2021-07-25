import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import { DrawerItems } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/AntDesign";

import { Avatar, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import * as localStorage from "../Interface/sqllite";

const Drawer = (props) => {
  //FIXME: there is problem, the user picture is always undefined.
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            paddingTop: "21%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ccc",
          }}
        >
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                props.userData.pic === null
                  ? "https://avatarfiles.alphacoders.com/263/thumb-1920-263348.jpg"
                  : props.userData.pic,
            }}
            containerStyle={styles.avatarContainerStyle}
          />
          <View>
            <Text>{props.userData.Name}</Text>
            <Text>The User Current year</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </ScrollView>
      <Button
        icon={
          <Icon name="logout" size={15} color="white" style={{ padding: 10 }} />
        }
        title="Logout"
        onPress={() => {
          AsyncStorage.removeItem("token").then((value) => {
            localStorage.SQLogout();
            props.navigation.navigate("Login");
          });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarContainerStyle: {
    borderColor: "blueviolet",
    borderWidth: 5,
    margin: 10,
  },
  avatarBackground: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
