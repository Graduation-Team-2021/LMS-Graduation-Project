import React from "react";
import { View, StyleSheet } from "react-native";
import Quiz from "../components/Quiz";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ANHeaderButton from "../components/ANHeaderButton";
const DeliberableSubmetionScreen = (props) => {
  let renderedItem = <Quiz {...props} />;
  return <View style={styles.screen}>{renderedItem}</View>;
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

DeliberableSubmetionScreen.navigationOptions = (navData) => {
  const submitButtonFunction = navData.navigation.getParam("submetQuizButton");
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ANHeaderButton}>
        <Item title="send" iconName="send" onPress={submitButtonFunction} color='white' />
      </HeaderButtons>
    ),
  };
};

export default DeliberableSubmetionScreen;
