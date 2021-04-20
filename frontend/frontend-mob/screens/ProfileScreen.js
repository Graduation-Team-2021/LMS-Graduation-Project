import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <Card containerStyle={styles.cardContainerStyle}>
        <LinearGradient
          // Button Linear Gradient
          colors={["red", "blue"]}
          style={styles.avatarBackground}
          start={{
            x: 0,
            y: 0.5,
          }}
          end={{
            x: 1,
            y: 0.5,
          }}
        >
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri:
                "https://avatarfiles.alphacoders.com/263/thumb-1920-263348.jpg",
            }}
            containerStyle={styles.avatarContainerStyle}
          />
        </LinearGradient>

        <Card.Divider />
        <View style={{ alignItems: "center", paddingBottom: 15 }}>
          <Text>THe User Name</Text>
          <Text>The user current year</Text>
          <Card
            wrapperStyle={styles.displayDataCardWrapperStyle}
            containerStyle={styles.displayDataCardContainerStyle}
          >
            <Text style={styles.text}>Passed Courses</Text>
            <Text  style={styles.text}>50</Text>
          </Card>
          <Card
            wrapperStyle={{ ...styles.displayDataCardWrapperStyle }}
            containerStyle={styles.displayDataCardContainerStyle}
          >
            <Text  style={styles.text} >Passed Courses</Text>
            <Text  style={styles.text} >50</Text>
          </Card>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  cardContainerStyle: {
    borderRadius: 25,
    width: "100%",
    alignItems: "stretch",
    padding: 0,
  },
  avatarContainerStyle: {
    borderColor: "blueviolet",
    borderWidth: 5,
    margin: 10,
  },
  avatarBackground: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  displayDataCardWrapperStyle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  displayDataCardContainerStyle: {
    borderRadius: 25,
    width: "80%",
  },
  text: {
      fontWeight: "bold",
      fontSize:20
  }
});

export default ProfileScreen;
