import * as React from "react";
import { View, Text } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { materialUri, azure } from "../Interface/Interface";

const PdfReader = (props) => {
  const pdfId = props.navigation.state.params.pdfId;
  const [pdfUri, setPdfUri] = React.useState("");
  React.useEffect(() => {
    materialUri(pdfId).then((res) => {
      setPdfUri(res);
    });
  }, []);
  return (
    pdfUri!==''?<PDFReader
      source={{
        uri: azure + pdfUri,
      }}
    />:<Text>Loading</Text>
  );
};
export default PdfReader;
