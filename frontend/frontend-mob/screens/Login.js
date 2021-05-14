import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Input, Image, Button } from "react-native-elements";

const LoginScreen = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [EmailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);

  const [LandScape, setLandScape] = useState(
    Dimensions.get("window").width > Dimensions.get("window").height
  );
  useEffect(() => {
    const updateLayout = () => {
      setLandScape(
        Dimensions.get("window").width > Dimensions.get("window").height
      );
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  let screenLayout = styles.screen;
  if (LandScape) {
    screenLayout = { ...screenLayout, ...styles.screenL };
  } else {
    screenLayout = { ...screenLayout, ...styles.screenP };
  }
  return (
    <ScrollView>
      <View style={screenLayout}>
        <View
          style={LandScape ? styles.imageContainerL : styles.imageContainerP}
        >
          <Image
            style={styles.image}
            source={{
              uri: "https://images7.alphacoders.com/567/thumb-1920-567688.jpg",
            }}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.h1}>Getting Started</Text>
          <Input placeholder="Emails..." label="Email" />
          <Input placeholder="Password..." label="Password" />
          <Button
            title="Submit"
            onPress={() => {
              //TODO: Implement this when connecting to the server
              console.log("[submeit button] would be impelemented");
            }}
            buttonStyle={styles.submitButton}
            containerStyle={styles.submitButtonContiner}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  screenL: {
    flexDirection: "row-reverse",
    paddingTop: 50,
    
  },
  screenP: {
    flexDirection: "column",
    padding: 50,
  },
  imageContainerP: {
    width: "100%",
    height: 200,
  },
  imageContainerL: {
    height: "100%",
    flex: 1
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  h1: {
    fontSize: 28,
    paddingTop: 10,
    color: "red",
    fontWeight: "bold",
  },
  inputsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    flex: 2,
  },
  submitButton: {
    width: 200 ,
  },
  submitButtonContiner: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});
export default LoginScreen;
