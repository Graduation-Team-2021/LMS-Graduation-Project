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

const DCourses = [
  {
    CourseName: "Tst1",
    CoursePicture: "https://images5.alphacoders.com/903/903845.png",
  },
  {
    CourseName: "Tst2",
    CoursePicture: "https://images2.alphacoders.com/732/732856.jpg",
  },
  {
    CourseName: "Tst3",
    CoursePicture: "https://images3.alphacoders.com/714/714619.png",
  },
  {
    CourseName: "Tst4",
    CoursePicture: "https://images.alphacoders.com/105/1058766.png",
  },
];

const DGroups = [
  {
    CourseName: "Tst1",
    CoursePicture: "https://images5.alphacoders.com/903/903845.png",
  },
  {
    CourseName: "Tst2",
    CoursePicture: "https://images2.alphacoders.com/732/732856.jpg",
  },
  {
    CourseName: "Tst3",
    CoursePicture: "https://images3.alphacoders.com/714/714619.png",
  },
  {
    CourseName: "Tst4",
    CoursePicture: "https://images.alphacoders.com/105/1058766.png",
  },
];

const HomeScreen = (props) => {
  const [c, setC] = useState([])
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
  }, []);

  useEffect(() => {
    Interface.getCurrentCourses(props.userData.Token).then((res) => {
      const Courses = [];
      if (res) {
        res.forEach((element) => {
          Courses.push(setCourse(element));
        });
        setCurrentCourses(Courses);
      }
    });
  }, []);

  useEffect(() => {
    Interface.getCurrentGroups(props.userData.Token).then((res) => {
      const Groups = [];
      if (res) {
        res.forEach((element) => {
          Groups.push(setGroup(element));
        });
        setCurrentGroups(Groups);
      }
    });
  }, []);

  useEffect(() => {
    Interface.getRecentPosts(props.userData.Token).then((res) => {
      const Posts = [];
      
        if (res) {
          res.forEach((ele, index) => {
            let POST = setFullPost(ele, props.userData.ID)
            Posts.push(<Text key={index}>{POST.Title}: {POST.Desc}</Text>);
          });
          if (setPosts) {
            setPosts(Posts);
          }
          setC(Posts)
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
            {c.length!==0?<Dismiss>{c}</Dismiss>:<Text>Loading.....</Text>}
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

HomeScreen.navigationOptions = (navData) => {
  const showBottomModalSheet = navData.navigation.getParam(
    "showBottomModalSheet"
  );
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ANHeaderButton}>
        <Item
          title="search"
          iconName="ios-search"
          onPress={showBottomModalSheet}
        />
      </HeaderButtons>
    ),
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
