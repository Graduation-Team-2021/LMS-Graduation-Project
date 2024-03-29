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
    if (props.userData.Role == "student") {
      Interface.getFinishedCourses(
        props.userData.Token,
        props.userData.ID,
        props.userData.Role
      ).then((res) => {
        if (res) setPassedCourses(res);
      });
      Interface.getRecentUserPosts(props.userData.Token).then((res) =>
        setYourPosts(res)
      );
    }
  }, []);
  let sum = 0;
  if (props.userData.Role == "student") {
    PassedCourses.forEach((course) => {
      sum += course.course_mark;
    });
  }
  console.log("adham nour", props.userData.pic);
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
                uri: Interface.azure + props.userData.pic,
              }}
              containerStyle={styles.avatarContainerStyle}
            />
          </LinearGradient>

          <Card.Divider />
          <View style={{ alignItems: "center", paddingBottom: 15 }}>
            <Text>{props.userData.Name}</Text>
            <Card
              wrapperStyle={styles.displayDataCardWrapperStyle}
              containerStyle={styles.displayDataCardContainerStyle}
            >
              <Text style={styles.text}>
                {props.userData.Role == "student"
                  ? "Passed"
                  : "Current Teaching"}{" "}
                Courses
              </Text>
              <Text style={styles.text}>
                {
                  (props.userData.Role === "student"
                    ? PassedCourses
                    : props.currentCourses.currentCourses
                  ).length
                }
              </Text>
            </Card>
            {props.userData.Role == "student" ? (
              <Card
                wrapperStyle={{ ...styles.displayDataCardWrapperStyle }}
                containerStyle={styles.displayDataCardContainerStyle}
              >
                <Text style={styles.text}>Total Grade</Text>
                <Text style={styles.text}>{sum}</Text>
              </Card>
            ) : null}
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
    textAlign: "center",
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
