import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import VideoList from "../components/videos_list";
import { uploadFile, getVideos, azure } from "../Interface/Interface";
import { Portal, FAB, Paragraph, Dialog, Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { showMessage, hideMessage } from "react-native-flash-message";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
// import DocumentPicker from 'react-native-document-picker';

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
      multiple: false,
    });
    console.log("[result]====================================");
    console.log(result);
    console.log("====================================");
    if (result.type != "cancel") {
      console.log("====================================");
      console.log(result);
      console.log("====================================");

      const fileBase64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // console.log("====================================");
      // console.log(fileBase64);
      // console.log("====================================");

      uploadFileHandler(result, fileBase64);

      // const base64Response = await fetch(
      //   `data:application/pdf;base64,${fileBase64}`
      // );
      // const blob = await base64Response.blob();

      // uploadFileHandler(new File(blob, result.name));

      // FileSystem.uploadAsync(
      //   `${azure}/courses/${myCourse.CourseID}/materials/upload`,
      //   result.uri,
      //   {
      //     httpMethod: "POST",
      //     headers: {
      //       Authorization: "Bearer " + props.userData.Token,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // ).then((result1) => console.log("[kak]", result1));
      // uploadFileHandler(result);
    }
    // try {
    //   const res = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.images],
    //   });
    //   console.log(
    //     res.uri,
    //     res.type, // mime type
    //     res.name,
    //     res.size
    //   );
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     // User cancelled the picker, exit any dialogs or menus and move on
    //   } else {
    //     throw err;
    //   }
    // }

    // // Pick multiple files
    // try {
    //   const results = await DocumentPicker.pickMultiple({
    //     type: [DocumentPicker.types.images],
    //   });
    //   for (const res of results) {
    //     console.log(
    //       res.uri,
    //       res.type, // mime type
    //       res.name,
    //       res.size
    //     );
    //   }
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     // User cancelled the picker, exit any dialogs or menus and move on
    //   } else {
    //     throw err;
    //   }
    // }
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

  let uploadFileHandler = (res, b64) => {
    uploadFile(
      props.userData.Token,
      res,
      myCourse.CourseID,
      setUploadPercentage,
      b64
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
        <FAB style={styles.fab} icon="plus" onPress={pickDocumentHandler} />
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
