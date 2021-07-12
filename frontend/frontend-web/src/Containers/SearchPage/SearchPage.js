import React, { useState, useEffect } from "react";

import classes from "./SearchPage.module.css";
import Card from "../../Components/Card/Card";
import Search from "../../Components/Search/Search";
import Waiting from "../../Components/Waiting/Waiting";
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
    setOption(value);
  };

  const onSearch = () => {
    if (query !== "") {
      if (!started) setStarted(true);
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

  useEffect(() => {
    if (query !== "") {
      setLoading(true);
      onSearch();
    } else {
      setResults([]);
    }
  }, [option, query]);

  return (
    <span className={classes.Holder}>
      <Card shadow className={classes.Card}>
        <Search setQuery={setQuery} />
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
        <Spacer height="25px" />
        <TabContext value={option}>
          <AppBar position="static">
            <TabList onChange={onChange} centered>
              <Tab label="User" value="User" />
              <Tab label="Course" value="Course" />
              <Tab label="Group" value="Group" />
            </TabList>
          </AppBar>
          <span
            style={{
              width: "100%",
            }}
          >
            <TabPanel value="User">
              <Waiting Loading={Loading}>
                <div className={classes.results}>{results}</div>
              </Waiting>
            </TabPanel>
            <TabPanel value="Course">
              <Waiting Loading={Loading}>
                <div className={classes.results}>{results}</div>
              </Waiting>
            </TabPanel>
            <TabPanel value="Group">
              <Waiting Loading={Loading}>
                <div className={classes.results}>{results}</div>
              </Waiting>
            </TabPanel>
          </span>
        </TabContext>
      </Card>
    </span>
  );
};

export default SearchPage;
