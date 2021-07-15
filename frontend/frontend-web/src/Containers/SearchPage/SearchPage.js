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
import { useCallback } from "react";
import Modal from "../../Components/Modal/Modal";
import Content from './Modal/ModalContent'

const SearchPage = (props) => {
  const [option, setOption] = useState("User");

  const [results, setResults] = useState([]);

  const [query, setQuery] = useState("");

  const [Loading, setLoading] = useState(false);

  const [started, setStarted] = useState(false);

  const [show, setShow] = useState(false)

  const [ModalData, setModalData] = useState(null)

  const onDismiss=()=>{
    setShow(false)
    setModalData(null)
  }

  const onShow=(Data)=>{
    setShow(true)
    setModalData(Data)
  }

  const onChange = (event, value) => {
    setOption(value);
  };

  const onSearch = useCallback(() => {
    if (query !== "") {
      if (!started) setStarted(true);
      if (option === "User") {
        searchUsers(query).then((res) => {
          setLoading(false);
          let tempResults = [];
          res.forEach((value, index) => {
            tempResults.push(<h1 onClick={()=>onShow(value)} key={index}>{value["name"]}</h1>);
          });
          setResults(tempResults);
        });
      } else if (option === "Course") {
        searchCourses(query).then((res) => {
          setLoading(false);
          let tempResults = [];
          res.forEach((value, index) => {
            tempResults.push(<h1 onClick={()=>onShow(value)} key={index}>{value["course_name"]}</h1>);
          });
          setResults(tempResults);
        });
      } else {
        searchGroups(query).then((res) => {
          setLoading(false);
          let tempResults = [];
          res.forEach((value, index) => {
            tempResults.push(<h1 onClick={()=>onShow(value)} key={index}>{value["group_name"]}</h1>);
          });
          setResults(tempResults);
        });
      }
    }
  },[option, query, started])

  useEffect(() => {
    if (query !== "") {
      setLoading(true);
      onSearch();
    } else {
      setResults([]);
    }
  }, [onSearch, option, query]);

  return (
    <span className={classes.Holder}>
    <Modal show={show} onClick={onDismiss}><Content Data={ModalData} Type={option}/></Modal>
      <Card shadow className={classes.Card}>
        <Search setQuery={setQuery} />
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
