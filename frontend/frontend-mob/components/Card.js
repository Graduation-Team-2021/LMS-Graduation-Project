import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.Card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  Card: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
