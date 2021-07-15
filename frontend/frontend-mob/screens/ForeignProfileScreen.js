import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import sha256 from "crypto-js/sha512";

const ForeignProfileScreen = (props) => {
  const target = props.navigation.getParam("target");
  const hashedItem = sha256(JSON.stringify(target));
  let avatarColor = "#";
  let firstColor = "#";
  let lastColor = "#";
  for (let index = 0; index < 6; index++) {
    const element = hashedItem.words[index];
    const element1 = hashedItem.words[index + 1];
    const element2 = hashedItem.words[index + 2];
    const newIndex = Math.abs(element % 16);
    const newIndex1 = Math.abs(element1 % 16);
    const newIndex2 = Math.abs(element2 % 16);
    avatarColor = avatarColor.concat(newIndex.toString(16));
    firstColor = firstColor.concat(newIndex1.toString(16));
    lastColor = lastColor.concat(newIndex2.toString(16));
  }
  console.log("====================================");
  console.log(target);
  console.log("====================================");
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Card containerStyle={styles.cardContainerStyle}>
          <LinearGradient
            colors={[firstColor, lastColor]}
            style={styles.avatarBackground}
            start={{
              x: 0,
              y: 0.5,
            }}
            end={{
              x: 1,
              y: 0.5,
            }}
            key={hashedItem}
          >
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri: "https://avatarfiles.alphacoders.com/263/thumb-1920-263348.jpg",
              }}
              containerStyle={{
                ...styles.avatarContainerStyle,
                backgroundColor: avatarColor,
              }}
              title={target.name[0].toUpperCase()}
              titleStyle={{ fontSize: 80 }}
              source={target.picture != null ? { uri: target.picture } : null}
            />
          </LinearGradient>
          <Card.Divider />
          <View style={{ alignItems: "center", paddingBottom: 15 }}>
            <Text>{target.name}</Text>
            <Text>email : {target.email} </Text>
          </View>
        </Card>
      </View>
    </ScrollView>
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
    borderColor: "white",
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
    fontSize: 20,
  },
  title: {
    paddingTop: 40,
  },
});

export default ForeignProfileScreen;
