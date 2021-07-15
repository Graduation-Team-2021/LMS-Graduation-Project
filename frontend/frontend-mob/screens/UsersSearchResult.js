import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import SearchList from "../components/SearchList";
import { searchUsers } from "../Interface/Interface";
import UsersSearchResultItem from "../components/UsersSearchResultItem";
import { azure } from "../Interface/Interface";
const UsersSearchResult = (props) => {
  const searchingQuery = props.navigation.getParam("searchingQuery");
  const [Result, setResult] = useState(null);

  const fetchUsers = () => {
    searchUsers(searchingQuery).then((res) => {
      let result = [];
      res.forEach((user) => {
        let modifedUser = user;
        if (modifedUser.picture) {
          modifedUser.picture = azure + modifedUser.picture;
        }
        result.push(modifedUser);
      });
      setResult(result);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.screen}>
      <SearchList
        Result={Result}
        ResultItemComponent={UsersSearchResultItem}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UsersSearchResult;
