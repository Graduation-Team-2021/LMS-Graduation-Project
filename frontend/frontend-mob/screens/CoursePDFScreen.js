import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import PdfList from "../components/pdf_list";
import { getPDFs, uploadFile } from "../Interface/Interface";
import { Portal, FAB, Paragraph, Dialog, Button } from "react-native-paper";

const CoursePDFScreen = (props) => {
  const [pdfsLoaded, setPdfsLoaded] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [visible, setVisible] = useState(false);
  const myCourse = props.navigation.getParam("course");
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
      setFile(result);
      showDialog();

      uploadFileHandler();
    }
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
  const retrievePdfs = () => {
    getPDFs(myCourse.CourseID).then((res) => {
      const temp = [];
      res.forEach((ele, index) => {
        temp.push({
          material_id: ele["material_id"],
          material_name: ele["material_name"],
          material_type: ele["material_type"],
        });
      });
      setPdfs(temp);
      setPdfsLoaded(true);
    });
  };
  useEffect(() => retrievePdfs(), []);

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
      {pdfsLoaded ? (
        <PdfList Pdfs={pdfs} navigation={props.navigation} />
      ) : (
        <ActivityIndicator color="red" />
      )}
    </Portal.Host>
  );

  if (pdfsLoaded) {
  } else {
  }
};

export default CoursePDFScreen;
