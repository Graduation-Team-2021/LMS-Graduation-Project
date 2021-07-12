import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import classes from "./Search.module.css";

const Search = (props) => {
  const [Main, setMain] = useState(classes.Main);

  const Focus = () => {
    setMain(classes.Main + " " + classes.Focus);
  };

  const Abort = () => {
    setMain(classes.Main);
  };

  const find = (event) => {
    props.setQuery(event.target.value)
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
          <FontAwesomeIcon icon={faSearch} size="2x"/>
        </div>
      </div>
    </div>
  );
};

export default Search;
