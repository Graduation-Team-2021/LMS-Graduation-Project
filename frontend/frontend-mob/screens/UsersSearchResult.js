import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import SearchList from "../components/SearchList";
import { searchUsers } from "../Interface/Interface";
import UsersSearchResultItem from "../components/UsersSearchResultItem";
const UsersSearchResult = (props) => {
  const searchingQuery = props.navigation.getParam("searchingQuery");
  const [Result, setResult] = useState(null);

  const fetchUsers = () => {
    searchUsers(searchingQuery).then((res) => {
      setResult(res);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.screen}>
      <SearchList Result={Result} ResultItemComponent={UsersSearchResultItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UsersSearchResult;
