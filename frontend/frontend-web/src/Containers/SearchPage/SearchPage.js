import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import classes from "./SearchPage.module.css";
import Card from "../../Components/Card/Card";
import Search from "../../Components/Search/Search";
import Waiting from "../../Components/Waiting/Waiting";
import Enroll from "../../Components/Enroll/Enroll";
import {
  searchUsers,
  searchCourses,
  searchGroups,
  BE_Enroll,
} from "../../Interface/Interface";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { AppBar, Tab } from "@material-ui/core";
import Spacer from "react-spacer";
import { useCallback } from "react";
import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";

import Modal from "../../Components/Modal/Modal";
import Content from "./Modal/ModalContent";

const SearchPage = (props) => {
  const [option, setOption] = useState("User");

  const [results, setResults] = useState([]);

  const [query, setQuery] = useState("");

  const [Loading, setLoading] = useState(false);

  const [started, setStarted] = useState(false);

  const [show, setShow] = useState(false);

  const [ModalData, setModalData] = useState(null);

  const [enroll, setEnroll] = useState(false);

  const onDismiss = () => {
    setShow(false);
    setModalData(null);
  };

  const onCancel = () => {
    setEnroll(false);
  };

  const onAccept = () => {
    BE_Enroll(
      props.userData.ID,
      props.userData.Token,
      ModalData.course_code
    ).then((res) => {
      if (res) {
        alert("Enroll Successful");
        setEnroll(false);
        const user = {...ModalData}
        user.status = "Enrolled"
        setModalData(user)
      } else {
        alert("Enroll Failed, please Try Again");
      }
    });
  };

  const onShow = (Data) => {
    setShow(true);
    setModalData(Data);
  };

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
            tempResults.push(
              <h1
              key={index}
                onClick={() => {
                  onShow(value);
                }}
              >
                {value["name"]}
              </h1>
            );
          });
          setResults(tempResults);
        });
      } else if (option === "Course") {
        searchCourses(query, props.userData.ID).then((res) => {
          setLoading(false);
          let tempResults = [];
          res.forEach((value, index) => {
            tempResults.push(
              <h1 onClick={() => onShow(value)} key={index}>
                {value["course_name"]}
              </h1>
            );
          });
          setResults(tempResults);
        });
      } else {
        searchGroups(query).then((res) => {
          setLoading(false);
          let tempResults = [];
          res.forEach((value, index) => {
            tempResults.push(
              <h1 onClick={() => onShow(value)} key={index}>
                {value["group_name"]}
              </h1>
            );
          });
          setResults(tempResults);
        });
      }
    }
  }, [option, props.userData.ID, query, started]);

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
      <Modal show={show} onClick={onDismiss}>
        <Content
          show={() => {
            setShow(false)
            setEnroll(true);
          }}
          dismiss={onDismiss}
          Data={ModalData}
          Type={option}
        />
      </Modal>
      
      {ModalData && option === "Course" && ModalData.course_code ? (
        <Modal show={enroll} onClick={onCancel}>
        {console.log(ModalData)}
          <Enroll
            isEnrolled={ModalData}
            id={ModalData.course_code}
            onAccept={onAccept}
            onCancel={onCancel}
          />
        </Modal>
      ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
