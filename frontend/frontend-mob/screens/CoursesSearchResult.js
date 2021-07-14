import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { searchCourses } from "../Interface/Interface";
import SearchList from  '../components/SearchList'
import CoursesSearchResultItem from '../components/CoursesSearchListItem'
const CoursesSearchResult = (props) => {
  const searchingQuery = props.navigation.getParam("searchingQuery");
  const [Result, setResult] = useState([]);
  const fetchCourses = () => {
    searchCourses(searchingQuery).then((res) => {
      setResult(res);
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <View style={styles.screen}>
      <SearchList Result={Result} ResultItemComponent={CoursesSearchResultItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CoursesSearchResult;
