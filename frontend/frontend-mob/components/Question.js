import React, { Fragment, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const Question = (props) => {
  //I expect to get the Question head and the possible answers
  const [value, setValue] = React.useState("first");

  return (
    <Fragment>
      <Text>{props.question}</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
      >
        {props.answers.map((answer) => (
          <View style={styles.RB}>
            <RadioButton value={answer} />
            <Text>{answer}</Text>
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
