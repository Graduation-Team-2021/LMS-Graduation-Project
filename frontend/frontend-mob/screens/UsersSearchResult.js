import React from "react";
import { View, Text, StyleSheet } from "react-native";
const UsersSearchResult = (props) => {
    console.log('[Users]',props)
  return (
    <View style={styles.screen}>
      <Text>
        This is the users search result, would be implemented while the
        integration
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UsersSearchResult;
