import React from "react";
import { FlatList } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import PdfItem from "./PdfItem";
import { deleteMaterial } from "../Interface/Interface";

const PdfList = (props) => {
  const previewPdfHandler = (pdf_id) => {
    props.navigation.navigate({
      routeName: "Pdf",
      params: { pdfId: pdf_id },
    });
  };
  const deleteMaterialHandler = (material_id, material_type) => {
    deleteMaterial(material_id).then((res) => {
      let new_pdfs = [...pdfs];
      var index = new_pdfs.findIndex(function (element) {
        return element.material_id === material_id;
      });
      if (index !== -1) {
        new_pdfs.splice(index, 1);
        setPdfs(new_pdfs);
      }

      showMessage({
        message: "Material deleted successfully.",
        type: "success",
        duration: "3000",
      });
    });
  };
  return (
    <FlatList
      data={props.Pdfs}
      keyExtractor={(_, index) => index.toString()}
      renderItem={(item, i) => {
        return (
          <PdfItem
            key={i}
            pdf={item.item}
            previewPdfHandler={previewPdfHandler}
            deleteMaterialHandler={deleteMaterialHandler}
          />
        );
      }}
    />
  );
};

export default PdfList;
