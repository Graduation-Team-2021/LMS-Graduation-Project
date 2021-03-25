import React from "react";

const ImageHolder = (props) => {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "40px",
        border: "1px solid black",
        width: "100%",
        overflow: "hidden",
        margin: "1vh 0",
      }}
    >
      <img
        src={props.filler}
        alt=""
        style={{
          objectFit: "contain",
          width: "100%",
          maxHeight: "100%",
          alignSelf: "center",
          justifySelf: "center",
        }}
      />
    </div>
  );
};

export default ImageHolder;
