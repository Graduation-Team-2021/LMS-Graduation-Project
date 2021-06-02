import React, { useState, useEffect } from "react";

import classes from "./SearchPage.module.css";
import Card from "../../Components/Card/Card";
import Search from "../../Components/Search/Search";

import {
  searchUsers,
  searchCourses,
  searchGroups,
} from "../../Interface/Interface";

const SearchPage = (props) => {
  const [option, setOption] = useState("User");

  const [results, setResults] = useState([]);

  const [query, setQuery] = useState("");

  const onChange = (event) => {
    setOption(event.target.value);
  };

  const onSearch = () => {
    if (query !== "") {
      if (option === "User") {
        searchUsers(query).then((res) => {
          let tempResults = [];
          res.forEach((value, index) => {
              tempResults.push(<h1 key={index}>{value['name']}</h1>)
          });
          setResults(tempResults)
        });
      } else if (option === "Course") {
        searchCourses(query).then((res) => {
          let tempResults = [];
          res.forEach((value, index) => {
              tempResults.push(<h1 key={index}>{value['course_name']}</h1>)
          });
          setResults(tempResults)
        });
      } else {
        searchGroups(query).then((res) => {
          let tempResults = [];
          res.forEach((value, index) => {
              tempResults.push(<h1 key={index}>{value['group_name']}</h1>)
          });
          setResults(tempResults)
        });
      }
    }
  };

  return (
    <span className={classes.Holder}>
      <Card shadow className={classes.Card}>
        <Search setQuery={setQuery} onSearch={onSearch} />
        <div className={classes.choice}>
          <div>
            <input
              type="radio"
              value="User"
              checked={option === "User"}
              onChange={onChange}
            />
            <label>User</label>
          </div>
          <div>
            <input
              type="radio"
              value="Course"
              checked={option === "Course"}
              onChange={onChange}
            />
            <label>Course</label>
          </div>
          <div>
            <input
              type="radio"
              value="Group"
              checked={option === "Group"}
              onChange={onChange}
            />
            <label>Group</label>
          </div>
        </div>
        <div className={classes.results}>{results}</div>
      </Card>
    </span>
  );
};

export default SearchPage;
