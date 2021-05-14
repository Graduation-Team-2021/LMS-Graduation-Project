import React, { useState, Fragment, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Card, Icon } from "react-native-elements";

const Dismiss = (props) => {
  const [Dismissed, setDismissed] = useState(false);
  const [List, setList] = useState(props.children);
  const fadeAnim = useRef(new Animated.Value(5)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
  };

  const onDismiss = () => {
    setDismissed(true);
    //fadeOut();
    setTimeout(() => {
      let temp = [...List];
      temp.pop();
      //props.onDismiss();
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
      <Card containerStyle={styles.initalCardStyle}>
        {List[List.length - 1]}
        <Icon
          type="ionicon"
          name="close-circle"
          onPress={() => {
            console.log("[50]this would be implemented");
            onDismiss();
          }}
        />
      </Card>
    );
  }
  let Back = null;
  if (List.length > 1) {
    Back = (
      <Card containerStyle={styles.initalCardStyle}>
        {List[List.length - 2]}
        <Icon
          type="ionicon"
          name="close-circle"
          onPress={() => {
            console.log("[65]this would be implemented");
            onDismiss();
          }}
        />
      </Card>
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

  let Back2 = null;
  if (Dismissed) {
    if (List.length > 2) {
      Back2 = (
        <Card containerStyle={styles.initalCardStyle}>
          {List[List.length - 3]}
          <Icon
            type="ionicon"
            name="close-circle"
            onPress={() => {
              console.log("[65]this would be implemented");
              onDismiss();
            }}
          />
        </Card>
      );
    } else if (List.length !== 1 || (List.length === 1 && Dismissed)) {
      Back2 = (
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
  }

  let mainView = styles.front;

  if (Dismissed) {
    mainView = { ...mainView, ...styles.Dismiss };
  }

  return (
    <View style={styles.holder}>
      <Animated.View style={[mainView, { opacity: fadeAnim }]}>
        {Main}
      </Animated.View>
      <Animated.View style={[Dismissed ? styles.appear : styles.behind]}>
        {Back}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  initalCardStyle: {
    borderWidth: 2,
    borderColor: "purple",
    padding: 0,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  elevetedCardStyle: {
    zIndex: 10,
    elevation: 10,
    overflow: "hidden",
    position: "absolute",
  },
  holder: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
  front: {
    padding: 0,
    height: 200,
    width: "100%",
    zIndex: 50,
    elevation: 50,
  },
  Dismiss: {
    transform: [{ translateX: 100 }],
    opacity: 0,
  },
  appear: {
    position: "absolute",
    padding: 0,
    width: "100%",
    height: 200,
    zIndex: 100,
    elevation: 100,
    transform: [{translateY:0}]
  },
  behind: {
    position: "absolute",
    zIndex: 0,
    elevation: 0,
    bottom: 0,
    width: "90%",
    height: 200,
    transform: [{translateY:20}]
    
  },
});

export default Dismiss;
