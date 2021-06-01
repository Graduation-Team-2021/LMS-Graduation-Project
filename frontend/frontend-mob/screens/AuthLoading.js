import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
const AuthLoadingScreen = (props) => {
  const bootStrapAsync = () => {
    dummyBool = true;
    props.navigation.navigate(dummyBool ? "MainNavigator" : "Login");
  };
  useEffect(() => bootStrapAsync(), []);
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoadingScreen;
