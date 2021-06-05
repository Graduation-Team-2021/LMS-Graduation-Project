import React from "react";
import { View, Text, StyleSheet } from "react-native";
const CoursesSearchResult = (props) => {
  return (
    <View style={styles.screen}>
      <Text>
        This is the Courses search result, would be implemented while the
        integration
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CoursesSearchResult;
