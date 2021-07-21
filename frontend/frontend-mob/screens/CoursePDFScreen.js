import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import PdfList from "../components/pdf_list";
import { getPDFs } from "../Interface/Interface";
const CoursePDFScreen = (props) => {
  const [pdfsLoaded, setPdfsLoaded] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const myCourse = props.navigation.getParam("course");

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

  if (pdfsLoaded) {
    return <PdfList Pdfs={pdfs} navigation={props.navigation} />;
  } else {
    return <ActivityIndicator color="red" />;
  }
};

export default CoursePDFScreen;
