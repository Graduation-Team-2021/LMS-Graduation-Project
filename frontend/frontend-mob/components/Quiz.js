import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { Card } from "react-native-elements";
import Question from "./Question";
import { getQuizByID, SubmitQuiz } from "../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import { FlatList } from "react-native";
const Quiz = (props) => {
  const [Questions, setQuestions] = useState([]);
  const quiz = props.navigation.getParam("Quiz");
  const score = useRef(0);
  useEffect(() => {
    getQuizByID(quiz.exam_id, props.userData.Token).then((result) => {
      setQuestions(result);
    });

    props.navigation.setParams({
      submetQuizButton: () => {
        //TODO:make sure that the user is sure
        SubmitQuiz({
          exam_id: quiz.exam_id,
          student_id: props.userData.ID,
          mark: score.current,
          out_of_mark: quiz.exam_marks,
        }).then((result) => {
          console.log("====================================");
          console.log(result);
          console.log("====================================");
          Alert.alert(
            "Quiz has been submitted successfully",
            "You have submitted your quiz successfully",
            [
              {
                text: "ok",
                onPress: () => {
                  props.navigation.goBack();
                },
              },
            ]
          );
        });
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
