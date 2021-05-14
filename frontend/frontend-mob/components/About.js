import React from "react";
import { View, Text, StyleSheet } from "react-native";

const About = (props) => {
  let description = "No Discription Available";
  if (props.description) {
    description = props.description;
  }
  return (
    <View>
      <Text style={styles.about} >About</Text>
      <Text style={styles.description} >{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  about: {
    fontSize: 24,
  },
  description: { fontSize: 20,paddingLeft:7 },
});

export default About;
