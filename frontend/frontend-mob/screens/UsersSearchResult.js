import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import SearchResultItem from "../components/SearchResultItem";
import { searchUsers } from "../Interface/Interface";

const UsersSearchResult = (props) => {
  const searchingQuery = props.navigation.getParam("searchingQuery");
  const [Result, setResult] = useState([]);
  const [Orientation, setOrientation] = useState(
    Dimensions.get("window").width >= Dimensions.get("window").height
  );
  const fetchUsers = () => {
    searchUsers(searchingQuery).then((res) => {
      setResult(res);
    });
  };

  useEffect(() => {
    fetchUsers();
    const orientationSetterHandler = ({ window }) => {
      setOrientation(window.width >= window.height);
    };
    Dimensions.addEventListener("change", orientationSetterHandler);
    return () => {
      Dimensions.removeEventListener("change", orientationSetterHandler);
    };
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={Result}
        renderItem={(item) => <SearchResultItem item={item.item} />}
        keyExtractor={(item, index) => `${index}`}
        numColumns={Orientation ? 3 : 1}
        key={Orientation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UsersSearchResult;
