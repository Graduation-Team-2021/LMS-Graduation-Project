import React from "react";

import cls from "./SearchItem.module.css";
import ImageHolder from "../../ImageHolder/ImageHolder";
import filler from "../../../assets/Filler.png";
const Item = (props) => {
  return (
    <div className={cls.SearchResult} onClick={props.onClick}>
      <ImageHolder className={cls.Pic} filler={props.img} />
      <h1 className={cls.SearchName}>{props.Name}</h1>
    </div>
  );
};

export default Item;
