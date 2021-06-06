import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Alert } from "react-native";
import { Image, Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import * as Interface from "../Interface/Interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

const LoginScreen = (props) => {
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
          <View style={{ width: "100%", padding: 10 }}>
            <TextInput
              label="Email"
              value={Email}
              onChangeText={(newEmail) => setEmail(newEmail)}
              error={EmailError}
            />
          </View>
          <View style={{ width: "100%", padding: 10 }}>
            <TextInput
              label="password"
              value={Password}
              onChangeText={(newPassword) => setPassword(newPassword)}
              error={PasswordError}
              secureTextEntry
            />
          </View>

          <Button
            title="Submit"
            onPress={() => {
              
              let err = false;
              if (Email.length <= 0) {
                setEmailError(true);
                err = true;
              }
              if (Password.length <= 0) {
                setPasswordError(true);
                err = true;
              }
              if (!err) {
                console.log(Email, Password);
                Interface.Login({ email: Email, password: Password }).then(
                  async (value) => {
                    if (value !== null) {
                      await AsyncStorage.setItem("token", value.Token);
                      await AsyncStorage.setItem("name", value.name);
                      let Data = {
                        Token: value.Token,
                        Name: value.name,
                        ID: jwt_decode(value.Token).id,
                        Role: jwt_decode(value.Token).permissions,
                      };
                      props.userDataActions.onSetData(Data);
                      props.navigation.navigate({
                        routeName: "MainNavigator",
                        params: { studentName: value.name },
                      });
                    } else {
                      //TODO : show a modal to inform the user about in valid login with a snackbar
                      Alert.alert(
                        "Log in Failed",
                        "You have entered wrong password or email, please try again later",
                        [{ text: "Okay", style: "destructive" }]
                      );
                    }
                  }
                );
              }
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
    flex: 1,
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
    width: 200,
  },
  submitButtonContiner: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
