import React, { Fragment, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const Question = (props) => {
  //I expect to get the Question head and the possible answers
  const [value, setValue] = useState("first");

  return (
    <Fragment>
      <Text>{props.question.question}</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
      >
        {props.question.answers.map((answer, index) => (
          <View style={styles.RB} key={index}>
            <RadioButton value={answer.answers} />
            <Text>{answer.answers}</Text>
          </View>
        ))}
      </RadioButton.Group>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  RB: {
    flexDirection: "row",
  },
});

export default Question;
