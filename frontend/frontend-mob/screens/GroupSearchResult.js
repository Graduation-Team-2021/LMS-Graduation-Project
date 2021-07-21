import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { searchGroups } from "../Interface/Interface";
import GroupSearchResultItem from "../components/GroupSearchResultListItem";
import SearchList from "../components/SearchList";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";

const GroupsSearchResult = (props) => {
  const searchingQuery = props.navigation.getParam("searchingQuery");
  const [Result, setResult] = useState([]);

  const fetchGroups = () => {
    searchGroups(searchingQuery, props.userData.Token).then((res) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupsSearchResult);
