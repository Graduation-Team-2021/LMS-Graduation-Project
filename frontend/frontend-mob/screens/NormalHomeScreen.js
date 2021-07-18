import React, { useState, Fragment, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ANHeaderButton from "../components/ANHeaderButton";
import { Button, BottomSheet } from "react-native-elements";
import SwipeList from "../components/SwipList";
import Dismiss from "../components/Dismiss";
import SearchingButtomModal from "../components/searchingButtomModal";
import * as Interface from "../Interface/Interface";
import { setCourse } from "../Models/Course";
import { setGroup } from "../Models/Group";
import { setFullPost } from "../Models/Post";
import { log } from "react-native-reanimated";

const DCourses = [];

const DGroups = [];

const NormalHomeScreen = (props) => {
  const [c, setC] = useState([]);
  const groupflag = true;

  const [ButtomModalVisability, setButtomModalVisability] = useState(false);

  const setCurrentCourses = props.currentCoursesActions.onSetCurrentCourses;

  const setCurrentGroups = props.currentGroupsActions.onSetCurrentGroups;

  const setPosts = props.recentUserPostsActions.onSetRecentUserPosts;

  useEffect(() => {
    props.navigation.setParams({
      showBottomModalSheet: () => setButtomModalVisability(true),
      studentName: props.userData.Name,
    });
    Interface.getCurrentCourses(props.userData.Token)
      .then((res) => {
        const Courses = [];
        if (res) {
          res.forEach((element) => {
            let currentCourse = setCourse(element);
            Courses.push(currentCourse);
          });
          setCurrentCourses(Courses);
        }
      })
      
    Interface.getCurrentGroups(props.userData.Token).then((res) => {
      const Groups = [];
      if (res) {
        res.forEach((element) => {
          Groups.push(setGroup(element));
        });
        setCurrentGroups(Groups);
      }
    });

    Interface.getRecentPosts(props.userData.Token).then((res) => {
      const Posts = [];
      if (res) {
        res.forEach((ele, index) => {
          let POST = setFullPost(ele, props.userData.ID);
          Posts.push(
            <Text key={index}>
              {POST.Title}: {POST.Desc}
            </Text>
          );
        });
        if (setPosts) {
          setPosts(Posts);
        }
        setC(Posts);
      }
    });
  }, []);

  return (
    <Fragment>
      <BottomSheet
        isVisible={ButtomModalVisability}
        modalProps={{
          onRequestClose: () => setButtomModalVisability(false),
          hardwareAccelerated: true,
          transparent: true,
        }}
      >
        <SearchingButtomModal
          closeTheBottomSheet={() => setButtomModalVisability(false)}
          navigateToResults={(searchingQuery) => {
            setButtomModalVisability(false);
            props.navigation.navigate({
              routeName: "SearchReasult",
              params: { searchingQuery: searchingQuery },
            });
          }}
        />
      </BottomSheet>
      <ScrollView>
        <View style={styles.screen}>
          <Text style={styles.title}>Courses you are enrolled in </Text>
          <SwipeList navigation={props.navigation} Data={DCourses} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              title="show all courses"
              containerStyle={{ margin: 5 }}
              onPress={() => props.navigation.navigate("CourseList")}
            />
            <Button
              title="show all Deliverables"
              containerStyle={{ margin: 5 }}
              onPress={() => props.navigation.navigate("DeliverableList")}
            />
          </View>
          <Text style={styles.title}>Your Groups</Text>
          <SwipeList
            navigation={props.navigation}
            groupflag={groupflag}
            Data={DGroups}
          />
          <Text style={styles.title}>Last Post</Text>
          <View style={{ height: 300, width: "100%" }}>
            {c.length !== 0 ? (
              <Dismiss>{c}</Dismiss>
            ) : (
              <Text>Loading.....</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NormalHomeScreen);
