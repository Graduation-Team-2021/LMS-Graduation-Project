import React, { useState, useEffect } from "react";

import classes from "./SearchPage.module.css";
import Card from "../../Components/Card/Card";
import Search from "../../Components/Search/Search";

import {
  searchUsers,
  searchCourses,
  searchGroups,
} from "../../Interface/Interface";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { AppBar, Tab } from "@material-ui/core";
import Spacer from "react-spacer";

const SearchPage = (props) => {
  const [option, setOption] = useState("User");

  const [results, setResults] = useState([]);

  const [query, setQuery] = useState("");

  const [Loading, setLoading] = useState(false);

  const [started, setStarted] = useState(false);

  const onChange = (event, value) => {
    console.log(value);
    setOption(value);
    setLoading(true);
  };

  const onSearch = () => {
    if (query !== "") {
      setStarted(true);
      if (option === "User") {
        searchUsers(query).then((res) => {
          setLoading(false);
          let tempResults = [];
          res.forEach((value, index) => {
            tempResults.push(<h1 key={index}>{value["name"]}</h1>);
          });
          setResults(tempResults);
        });
      } else if (option === "Course") {
        searchCourses(query).then((res) => {
          setLoading(false);
          let tempResults = [];
          res.forEach((value, index) => {
            tempResults.push(<h1 key={index}>{value["course_name"]}</h1>);
          });
          setResults(tempResults);
        });
      } else {
        searchGroups(query).then((res) => {
          setLoading(false);
          let tempResults = [];
          res.forEach((value, index) => {
            tempResults.push(<h1 key={index}>{value["group_name"]}</h1>);
          });
          setResults(tempResults);
        });
      }
    }
  };

  return (
    <span className={classes.Holder}>
      <Card shadow className={classes.Card}>
        <Search setQuery={setQuery} onSearch={onSearch} />
        {/* <div className={classes.choice}>
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
        <div className={classes.results}>{results}</div> */}
        <Spacer height="10px"/>
        <TabContext value={option}>
          <AppBar position="static">
            <TabList onChange={onChange} centered>
              <Tab label="User" value="User" />
              <Tab label="Course" value="Course" />
              <Tab label="Group" value="Group" />
            </TabList>
          </AppBar>
          <TabPanel value="1">Users</TabPanel>
          <TabPanel value="2">Courses</TabPanel>
          <TabPanel value="3">Groups</TabPanel>
        </TabContext>
      </Card>
    </span>
  );
};

export default SearchPage;
