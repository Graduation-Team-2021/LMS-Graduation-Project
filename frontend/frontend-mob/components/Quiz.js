import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import Question from "./Question";
import { getQuizByID } from "../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import { FlatList } from "react-native";
const Quiz = (props) => {
  const [Questions, setQuestions] = useState([]);
  const quiz = props.navigation.getParam("Quiz");
  useEffect(() => {
    getQuizByID(quiz.exam_id, props.userData.Token).then((result) => {
      setQuestions(result);
    });

    props.navigation.setParams({
      submetQuizButton: () => {
        console.log("====================================");
        console.log("submitting the quiz");
        console.log("====================================");
      },
    });
  }, []);

  return (
    <View style={styles.parentView}>
      <Text> The Quiz consists of {Questions.length} questions </Text>

      <FlatList
        horizontal
        renderItem={(item) => (
          <Card containerStyle={styles.cardContainerStyle}>
            <Question question={item.item} />
          </Card>
        )}
        keyExtractor={(_, i) => i.toString()}
        data={Questions}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
