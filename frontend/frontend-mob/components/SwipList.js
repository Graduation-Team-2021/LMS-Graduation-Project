import React from "react";
import { View,  FlatList } from "react-native";
import CoursePreview from "./CoursePreview";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";

const SwipeList = (props) => {
  List = !props.groupflag
    ? props.currentCourses.currentCourses
    : props.currentGroups.currentGroups;

  return (
    <View style={{ height: 250 }}>
      <FlatList
        data={List}
        keyExtractor={(item, index) => `${index}`}
        renderItem={(item) => {
          return (
            <CoursePreview
              Course={item.item}
              navigation={props.navigation}
              groupflag={props.groupflag}
            />
          );
        }}
        horizontal
      />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SwipeList);
