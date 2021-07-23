import React from "react";
import { View, StyleSheet , Divider , Text , Button} from "react-native";
import {
  getAllPosts,
  uploadPost,
  deleteMaterial,
  deleteDeliverable,
  getPDFs,
  getVideos,
  getAllCourseDeliverables,
  uploadFile,
} from "../Interface/Interface";
import { connect } from "react-redux";
import VideoItem from '../components/VideoItem';
import PdfItem from '../components/PdfItem';
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import { showMessage, hideMessage } from "react-native-flash-message";

// const deleteDeliverableHandler = (deliverable_id) => {
//     deleteDeliverable(deliverable_id).then((res) => {
//       let new_deliverables = [...deliverables];
//       var index = new_deliverables.findIndex(function (element) {
//         return element.deliverable_id === deliverable_id;
//       });
//       if (index !== -1) {
//         new_deliverables.splice(index, 1);
//         setDeliverables(new_deliverables);
//       }
//       showMessage({
//         message: "Deliverable deleted successfully.",
//         type: "success",
//         duration: "3000",
//       });
//     });
//   };
const AddDerverbles = (props) => { 
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

  const createNewDeliverableHandler = () => {
    props.navigation.navigate({
      routeName: "CreateDeliverable",
      params: {
        courseId: myCourse.CourseID,
        alertDeliverableCreated: alertDeliverableCreated,
        updateDeliverables: updateDeliverables,
      },
    });
  };
  const materialsDetails = (
    <View style={styles.materialsContainer}>
      <Divider style={styles.dividerStyle} />
      <Text style={styles.videos_pdfs_header}>Deliverables</Text>
        <Button
          title="CREATE DELIVERABLE"
          buttonStyle={{
            minWidth: 150,
            width: "70%",
            maxWidth: 200,
            alignSelf: "center",
            marginTop: 20,
          }}
          titleStyle={{ fontSize: 12 }}
          onPress={createNewDeliverableHandler}
        />
      <Divider style={styles.dividerStyle} />
      <Text style={styles.videos_pdfs_header}>Videos</Text>
      {videosLoaded &&
        videos.map((video, i) => (
          <VideoItem
            key={i}
            video={video}
            previewVideoHandler={previewVideoHandler}
            deleteMaterialHandler={deleteMaterialHandler}
          ></VideoItem>
        ))}
      {videosLoaded && videos.length == 0 && (
        <Text style={{ alignSelf: "center" }}>There are no videos.</Text>
      )}
      {!videosLoaded && <ActivityIndicator size="small" />}
      <Divider style={styles.dividerStyle} />
      <Text style={styles.videos_pdfs_header}>PDFs</Text>
      {pdfsLoaded &&
        pdfs.map((pdf, i) => (
          <PdfItem
            key={i}
            pdf={pdf}
            previewPdfHandler={previewPdfHandler}
            deleteMaterialHandler={deleteMaterialHandler}
          ></PdfItem>
        ))}
      {pdfsLoaded && pdfs.length == 0 && (
        <Text style={{ alignSelf: "center" }}>There are no videos.</Text>
      )}
      {!pdfsLoaded && <ActivityIndicator size="small" />}
      <Divider style={styles.dividerStyle} />
      {role == "professor" && (
        <View>
          <Text style={styles.videos_pdfs_header}>Upload Material</Text>
          <Button
            title="Choose File"
            buttonStyle={{
              minWidth: 150,
              width: "70%",
              maxWidth: 200,
              alignSelf: "center",
              margin: 10,
            }}
            titleStyle={{ fontSize: 12 }}
            onPress={pickDocumentHandler}
            icon={<AntDesign name="addfile" size={20} color="white" />}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {!file || file.name == "" ? (
              <Text>No file is chosen</Text>
            ) : (
              <Text>{file.name}</Text>
            )}
          </View>
          <Button
            title="Upload File"
            disabled={file == "" ? true : false}
            buttonStyle={{
              minWidth: 150,
              width: "70%",
              maxWidth: 200,
              alignSelf: "center",
              margin: 10,
            }}
            titleStyle={{ fontSize: 12 }}
            onPress={uploadFileHandler}
            icon={<AntDesign name="upload" size={20} color="white" />}
          />
          {uploadPercentage == 0 ? (
            <Text></Text>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Progress.Bar progress={uploadPercentage} width={150} />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    materialsContainer: {
      textAlign: "center",
    },
    submissionContainer: {
      marginLeft: 20,
    },
    screen: {
      flex: 1,
      justifyContent: "center",
      fontSize: 20,
    },
    topContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    buttonContainer: {
      paddingVertical: 5,
    },
    iconStyle: {
      marginLeft: 11,
    },
    dividerStyle: {
      margin: 20,
    },
    videos_pdfs_header: {
      textAlign: "center",
      fontSize: 20,
      marginBottom: 10,
    },
    courseHeader: {
      fontSize: 23,
      fontWeight: "500",
      marginTop: 10,
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddDerverbles);