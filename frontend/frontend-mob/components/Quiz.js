import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Card, Button } from "react-native-elements";
import Question from "./Question";
const Quiz = (props) => {
  const questions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];
  return (
    <View style={styles.parentView}>
      <Text> The Quiz consists of {questions.length} questions </Text>
      <ScrollView horizontal>
        {questions.map((question) => (
          <Card containerStyle={styles.cardContainerStyle}>
            <Question question={`Qestion Numbers ${question}`} answers={['a','b','c','d','e']} />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    width: Dimensions.get("window").width * 0.9,
    height: "90%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  parentView: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
});

export default Quiz;
