import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Card, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import ANHeaderButton from "../components/ANHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Dismiss from "../components/Dismiss";
import * as Interface from "../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import sha256 from "crypto-js/sha512";

const ProfileScreen = (props) => {
  const [PassedCourses, setPassedCourses] = useState([]);
  const [YourPosts, setYourPosts] = useState([]);
  useEffect(() => {
    Interface.getFinishedCourses(
      props.userData.Token,
      props.userData.ID,
      props.userData.Role
    )
      .then((res) => {
        console.log('[AN]====================================');
        console.log(res);
        console.log('[AN]====================================');
        setPassedCourses(res);
      })
      .catch((e) => console.log(e));
    Interface.getRecentUserPosts(props.userData.Token)
      .then((res) => setYourPosts(res))
      .catch((e) => console.log(e));
  }, []);
  let sum = 0;
  PassedCourses.forEach((course) => {
    sum += course.course_mark;
  });
  return (
    <ScrollView>
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
                uri: "https://avatarfiles.alphacoders.com/263/thumb-1920-263348.jpg",
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
              <Text style={styles.text}>{PassedCourses.length}</Text>
            </Card>
            <Card
              wrapperStyle={{ ...styles.displayDataCardWrapperStyle }}
              containerStyle={styles.displayDataCardContainerStyle}
            >
              <Text style={styles.text}>Total Grade</Text>
              <Text style={styles.text}>{sum}</Text>
            </Card>
          </View>
        </Card>
        <Text style={[styles.text, styles.title]}>Your Posts</Text>
        <Dismiss key={sha256(JSON.stringify(YourPosts)).words[0]}>
          {YourPosts.map((post, index) => (
            <Text key={post}>{post.post_text}</Text>
          ))}
        </Dismiss>

        <Text style={[styles.text, styles.title]}>Your Passed Courses</Text>

        <Dismiss key={sha256(JSON.stringify(PassedCourses)).words[1]}>
          {PassedCourses.map((course, index) => (
            <Text key={course}>{course.course_code}</Text>
          ))}
        </Dismiss>
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
    fontSize: 20,
  },
  title: {
    paddingTop: 40,
  },
});

ProfileScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={ANHeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
