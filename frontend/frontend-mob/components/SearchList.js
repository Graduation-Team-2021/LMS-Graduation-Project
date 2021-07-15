import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, Text, Dimensions } from "react-native";
const SearchResultList = (props) => {
  const [Orientation, setOrientation] = useState(
    Dimensions.get("window").width >= Dimensions.get("window").height
  );
  useEffect(() => {
    const orientationSetterHandler = ({ window }) => {
      setOrientation(window.width >= window.height);
    };
    Dimensions.addEventListener("change", orientationSetterHandler);
    return () => {
      Dimensions.removeEventListener("change", orientationSetterHandler);
    };
  }, []);

  let mainComponent = (
    <FlatList
      data={props.Result}
      renderItem={(item) => <props.ResultItemComponent item={item.item} navigation={props.navigation}/>}
      keyExtractor={(item, index) => `${index}`}
      numColumns={Orientation ? 3 : 1}
      key={Orientation}
    />
  );
  if (props.Result == null) {
    mainComponent = <ActivityIndicator size="large" color="red" />;
  } else if (props.Result.length === 0) {
    mainComponent = <Text>No Result</Text>;
  }
  return mainComponent;
};

export default SearchResultList;
