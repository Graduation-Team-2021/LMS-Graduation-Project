import React, { useState, Fragment } from "react";
import {
  View,
  Dimensions,
  Button
} from "react-native";
import { TextInput} from "react-native-paper";

const searchingButtomModal = (props) => {
  const [text, setText] = React.useState("");
  return (
    <Fragment>
      <View
        style={{
          backgroundColor: "white",
          minHeight: Dimensions.get("window").height * 0.30,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View style={{ width: "95%", padding:10 }}>
          <TextInput
            label="Search About"
            value={text}
            onChangeText={(text1) => setText(text1)}
            mode="outlined"
            placeholder="What are you searching about..."
          />
        </View>
        
        <Button
          title={text.length === 0 ? "Close The Search" : "Search"}
          onPress={
            text.length === 0
              ? props.closeTheBottomSheet
              : () => props.navigateToResults(text)
          }
        />
      </View>
    </Fragment>
  );
};

export default searchingButtomModal;
