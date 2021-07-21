import React, { Fragment } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
const QuizItem = (props) => {
  const previewQuizHandler = props.previewQuizHandler;

  return (
    <View
      style={{
        marginLeft: 15,
        flexDirection: "row",
        marginTop: 10,
        paddingRight: 20,
      }}
    >
      <TouchableOpacity
        onPress={previewQuizHandler}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Fragment>
          <FontAwesome
            name="question"
            size={20}
            style={{ marginRight: 6, opacity: 0.7 }}
          />
          <Text> Quiz #{props.Quiz.exam_id}</Text>
        </Fragment>
      </TouchableOpacity>
      {props.userData.Role != "professor" && (
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <AntDesign
            size={20}
            color={
              props.Quiz.status == "pending"
                ? "orange"
                : props.Quiz.status == "finished"
                ? "green"
                : "red"
            }
            name={
              props.Quiz.status == "missing" ? "closecircle" : "checkcircle"
            }
          ></AntDesign>
          <Text>{props.Quiz.status}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    opacity: 0.8,
  },
  dividerStyle: {
    margin: 20,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(QuizItem);
