import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import classes from "./Search.module.css";
import Card from "../Card/Card";

const Search = (props) => {
  const [Main, setMain] = useState(classes.Main);

  const FullList = [
    "david",
    "david",
    "david",
    "david",
    "david",
    "david",
    "david",
    "david",
    "david",
    "john",
    "ibrahim",
  ];

  const [suggest, setSuggest] = useState([]);

  const Focus = () => {
    setMain(classes.Main + " " + classes.Focus);
  };

  const Abort = () => {
    setMain(classes.Main);
  };

  const find = (event) => {
    let suggest = [];
    FullList.forEach((element, index) => {
      if (
        event.target.value !== "" &&
        element.startsWith(event.target.value.toLowerCase())
      ) {
        suggest.push(<h2 key={index}>{element}</h2>);
      }
    });
    setSuggest(suggest);
  };

  return (
    <div className={classes.full}>
      <div className={Main}>
        <input
          onChange={find}
          placeholder="Search Here"
          className={classes.input}
          onFocus={Focus}
          onBlur={Abort}
        />
        <div>
          <FontAwesomeIcon icon={faSearch} size="2x" />
        </div>
      </div>
      {suggest.length !== 0 ? (
        <div className={classes.suggest}>
          <Card className={classes.Card} shadow>
            {suggest}
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
