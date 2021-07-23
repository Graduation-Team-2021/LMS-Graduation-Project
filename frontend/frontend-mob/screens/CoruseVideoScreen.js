import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import VideoList from "../components/videos_list";
import { uploadFile, getVideos } from "../Interface/Interface";
import { Portal, FAB, Paragraph, Dialog, Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { showMessage, hideMessage } from "react-native-flash-message";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import * as FileSystem from "expo-file-system";
const CourseVideoScreen = (props) => {
  const myCourse = props.navigation.getParam("course");
  const [videos, setVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  let pickDocumentHandler = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });
    console.log("[result]====================================");
    console.log(result);
    console.log("====================================");
    if (result.type != "cancel") {
      
      FileSystem.readAsStringAsync(result.uri).then((res) => {
        let f = new File(new Blob(res), result.name)
        setFile(f);
        showDialog();
        uploadFileHandler();
      });
    }
  };
  const retrieveVideos = () => {
    getVideos(myCourse.CourseID).then((res) => {
      const temp = [];
      res.forEach((ele, index) => {
        temp.push({
          material_id: ele["material_id"],
          material_name: ele["material_name"],
          material_type: ele["material_type"],
        });
      });
      setVideos(temp);
      setVideosLoaded(true);
    });
  };

  let uploadFileHandler = () => {
    uploadFile(
      props.userData.Token,
      file,
      myCourse.CourseID,
      setUploadPercentage
    ).then((res) => {
      setFile("");
      showMessage({
        message: "File uploaded successfully.",
        type: "success",
        duration: "3000",
      });
      setUploadPercentage(0);
      retrievePdfs();
      retrieveVideos();
      showMessage({
        message: "Material uploaded successfully.",
        type: "success",
        duration: "3000",
      });
    });
  };

  useEffect(() => {
    retrieveVideos();
  }, []);

  return (
    <Portal.Host>
      {/* <Portal>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={pickDocumentHandler}
        />
      </Portal>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Uploading a FIle</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{uploadPercentage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
      {videosLoaded ? (
        <VideoList videos={videos} navigation={props.navigation} />
      ) : (
        <ActivityIndicator color="red" />
      )}
    </Portal.Host>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseVideoScreen);
