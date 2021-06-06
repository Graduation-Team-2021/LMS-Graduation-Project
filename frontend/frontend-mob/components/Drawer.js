import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import { DrawerItems } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/AntDesign";

import { Avatar, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
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
              uri: "https://avatarfiles.alphacoders.com/263/thumb-1920-263348.jpg",
            }}
            containerStyle={styles.avatarContainerStyle}
          />
          <View>
            <Text>The User Name</Text>
            <Text>The User Current year</Text>
          </View>
        </View>
        <DrawerItems {...props} />
        <View style={{ height: "45%" }}></View>
        <Button
          icon={
            <Icon
              name="logout"
              size={15}
              color="white"
              style={{ padding: 10 }}
            />
          }
          title="Logout"
          onPress={() => {
            AsyncStorage.removeItem("token").then((value) => {
              props.navigation.navigate("Login");
            });
          }}
        />
      </View>
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

export default Drawer;
