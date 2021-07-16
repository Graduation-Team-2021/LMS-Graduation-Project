import React, { useState, useEffect } from "react";
import Waiting from "../Components/Waiting/Waiting";
import { getOnePDF, url } from "../Interface/Interface";
import classes from "./Pdf_reader.module.css";

const PDF = (props) => {
  document.title = "PDF Reader";

  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //TODO: Load Data
    getOnePDF(props.match.params.id).then((res) => {
      setLoading(false);
      setSrc(url + res);
    });
  }, [props.match.params.id]);

  return (
    <span className={classes.Main}>
      <Waiting Loading={loading}>
        <iframe
          title="PDF"
          src={src}
          frameBorder="0"
          height="100%"
          width="100%"
          allowFullScreen
        />
      </Waiting>
    </span>
  );
};

export default PDF;
