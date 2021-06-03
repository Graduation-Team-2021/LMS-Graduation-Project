import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import BeingUploadedFile from "./BeingUploadedFile";

const Assignment = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const deleteFile = (target_index) => {
    let newUplodedFiles = uploadedFiles.filter(
      (_, index) => index !== target_index
    );
    setUploadedFiles(newUplodedFiles);
  };

  let renderdFile = <Text>There's no file to be uploaded</Text>;
  if (uploadedFiles.length > 0) {
    renderdFile = uploadedFiles.map((file, index) => (
      <BeingUploadedFile
        file={file}
        key={index}
        changeList={deleteFile}
        index={index}
      />
    ));
  }

  return (
    <Fragment>
      <Card containerStyle={styles.cardContainerStyle}>
        <ScrollView>{renderdFile}</ScrollView>
      </Card>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
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
        <View style={styles.button}>
          <Button
            title="Upload"
            onPress={() => {
              console.log("Upload");
            }}
          />
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    width: Dimensions.get("window").width * 0.9,
    maxHeight: "84%",
    minHeight: "50%",
    borderRadius: 50,
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 15,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
});

export default Assignment;
