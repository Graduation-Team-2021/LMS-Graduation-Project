import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Card } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";

const Assignment = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  let renderdFile = <Text>There's no file to be uploaded</Text>;
  if (uploadedFiles.length > 0) {
    renderdFile = uploadedFiles.map((file, index) => (
      <Text key={index}>{file.name}</Text>
    ));
  }

  return (
    <Fragment>
      <Card containerStyle={styles.cardContainerStyle}>{renderdFile}</Card>
      <View style={{padding:15}}>
        <Button
          title="Pick a File to Upload"
          onPress={() => {
            DocumentPicker.getDocumentAsync().then((value) => {
              if (value.type === "cancel") {
                Alert.alert(
                  "Picking file canceled",
                  "you have canceled picking a file operation",
                  [
                    {
                      text: "Ok",
                      onPress: () => console.log("ok"),
                      style: "default",
                    },
                  ]
                );
              } else {
                setUploadedFiles([...uploadedFiles, value]);
              }
            });
          }}
        />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    width: Dimensions.get("window").width * 0.9,
    minHeight: "50%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Assignment;
