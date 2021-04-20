import React, { useState, Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Icon } from "react-native-elements";

const Dismiss = (props) => {
  const [Dismissed, setDismissed] = useState(false);
  const [List, setList] = useState(props.children);

  const onDismiss = () => {
    setDismissed(true);
    setTimeout(() => {
      let temp = [...List];
      temp.pop();
      props.onDismiss();
      setList(temp);
      setDismissed(false);
    }, 500);
  };
  let Top = List[List.length - 1];
  let Main = (
    <Card containerStyle={styles.initalCardStyle}>
      <Text>No More</Text>
    </Card>
  );

  if (List.length !== 0) {
    Main = (
      <Fragment>
        {List[List.length - 1]}
        <Icon
          type="ionicon"
          name="close-circle"
          onPress={() => {
            console.log("this would be implemented");
          }}
        />
      </Fragment>
    );
  }
  let Back = null;
  if (List.length > 1) {
    Back = (
      <Fragment>
        {List[List.length - 2]}
        <Icon
          type="ionicon"
          name="close-circle"
          onPress={() => {
            console.log("this would be implemented");
          }}
        />
      </Fragment>
    );
  } else if (List.length !== 0 || (List.length === 0 && Dismissed)) {
    Back = (
      <Card
        containerStyle={{
          ...styles.initalCardStyle,
          ...styles.elevetedCardStyle,
        }}
      >
        <Text>No More</Text>
      </Card>
    );
  }
  return (
    <View>
      <Text>This is dismissed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  initalCardStyle: {
    borderWidth: 2,
    borderColor: "purple",
    padding: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  elevetedCardStyle: {
    zIndex: 10,
    elevation: 10,
  },
});

export default Dismiss;
