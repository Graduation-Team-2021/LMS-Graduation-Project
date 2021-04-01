import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const LoginScren = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Getting Started</Text>
      <View style={styles.buttonContainer}>
        <Button title="SIGN IN" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default LoginScren;
