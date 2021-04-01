import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen'

export default function App() {
  return (
    <View style={styles.screenView}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});
