import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { searchGroups } from "../Interface/Interface";
import GroupSearchResultItem from "../components/GroupSearchResultListItem";
import SearchList from "../components/SearchList";

const GroupsSearchResult = (props) => {
  const searchingQuery = props.navigation.getParam("searchingQuery");
  const [Result, setResult] = useState([]);

  const fetchGroups = () => {
    searchGroups(searchingQuery).then((res) => {
      setResult(res);
    });
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <View style={styles.screen}>
      <SearchList
        Result={Result}
        ResultItemComponent={GroupSearchResultItem}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default GroupsSearchResult;
