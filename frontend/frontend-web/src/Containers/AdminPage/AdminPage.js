import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FilePicker } from "react-file-picker";

import ImageHolder from "../../Components/ImageHolder/ImageHolder";
import Card from "../../Components/Card/Card";
import filler from "../../assets/Filler.png";
import classes from "./AdminPage.module.css";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/NormalTextField/NormalTextField";

import { mapStateToProps, mapDispatchToProps } from "../../store/reduxMaps";
import {
  updatePic,
  getUser,
  url,
  ExcelSignUp,
  getCourses,
} from "../../Interface/Interface";

const AdminPage = (props) => {
  const [dismiss, setDismiss] = useState(false);

  const [userSelf, setuserSelf] = useState(null);

  const { ID } = props.userData;

  const [Content, setContent] = useState(null);

  const [course, setCourse] = useState(null);

  const [show, setShow] = useState(false);

  const [courses, setCourses] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const handleFIleUpload = (file) => {
    Submit(file);
  };

  useEffect(() => {
    getUser(ID).then((res) => {
      res.picture = url + res.picture;
      setuserSelf(res);
    });
  }, [ID]);

  const Submit = (files) => {
    updatePic(props.userData.ID, files).then((res) => {
      if (res) {
        const temp = { ...userSelf };
        temp.picture = url + res.picture;
        props.userDataActions.onSetPic(url + res.picture);
        localStorage.setItem("pic", url + res.picture);
        setuserSelf(temp);
      }
    });
  };

  const Sign_excel = (files) => {
    ExcelSignUp(files).then((res) => {
      if (res.status_code === 200) {
        alert("Uploaded Successfully");
        setShow(false);
      } else {
        alert(res.message);
      }
    });
  };

  const showEdited = () => {
    if (!loaded) {
      getCourses("").then((res) => {
        setLoaded(true);
        if (res) {
          const t = [];
          res.forEach((c, i) => {
            t.push({
              name: c["course_code"] + "-" + c["course_name"],
              value: i,
              "Course Code": c["course_code"],
              "Course Name": c["course_name"],
              "Weekly Hours": c["weekly_hours"],
              "Number of Groups": c["group_number"],
              "Max Number of Students": c["max_students"],
              "Course Description": c["course_description"],
              "List of Doctors": c["professors"].map((value) => ({
                name: value["name"],
                value: value["user_id"],
              })),
              post_owner_id: c["post_owner_id"],
              "Enrollment Deadline": c['course_deadline'].slice(0, 10),
              "Course Picture(Optional)": c['course_pic'],
              'Final Grades': c['final'],
              'Midterm Grades': c['mid'],
              'Prerequisites': c['pre'].map(val=>({
                name: val["course_name"],
                value: val["course_code"],
              }))
            });
          });
          setCourses(t);
          setCourse(0);
          setContent("Course");
          setShow(true);
        }
      });
    } else {
      setCourse(0);
      setContent("Course");
      setShow(true);
    }
  };

  const showUser = () => {
    setContent("User");
    setShow(true);
  };

  const setEdited = (value) => {
    setCourse(value.value);
  };

  const EditCourse = () => {
    props.history.push({
      pathname: `/AddCourse`,
      state: {
        Course: courses[course],
      },
    });
  };

  const Transition = (path) => {
    onDismiss(() => props.history.push(path));
  };

  const hide = () => {
    setShow(false);
  };

  const onDismiss = (callback) => {
    setDismiss(true);
    setTimeout(() => {
      callback();
      setDismiss(false);
    }, 500);
  };
  document.title = "Home Page";

  const Edit = (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <Input
        Name="Select Course"
        DataList={courses}
        type="select"
        value={[courses[course]]}
        onSelect={(_, Item, __) => setEdited(Item)}
      />
      <Button onClick={EditCourse}>Edit Course</Button>
    </div>
  );

  const Upload = (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <h2>
        Please, Ensure that the Excel File contains the following Columns:
      </h2>
      <p>
        name, email, password, national_id, birthday, student_year,
        scientific_degree, role
      </p>
      <p></p>
      <h2>Ensure that email, national_id are unique</h2>
      <h2>Also, role must be either "student" or 'professor'</h2>
      <FilePicker
        onChange={(FileObject) =>
          //TODO: Provide Formatted Excel Sheet
          Sign_excel(FileObject)
        }
        onError={(errMsg) => {
          /* do something with err msg string */
        }}
      >
        <Button>Upload</Button>
      </FilePicker>
    </div>
  );

  const field = Content === "Course" ? Edit : Upload;

  return (
    <div className={classes.Center + " " + (dismiss ? classes.dismiss : "")}>
      <Modal show={show} onClick={hide}>
        {field}
      </Modal>
      <Card shadow className={classes.Container}>
        <Card className={classes.Card} shadow>
          <div className={classes.background}>{/*insert your image here*/}</div>
          <div className={classes.User}>
            <div className={classes.main}>
              <ImageHolder
                className={classes.Pic}
                filler={
                  userSelf && userSelf["picture"] ? userSelf["picture"] : filler
                }
              />
              <span className={classes.D}>
                <div className={classes.Details}>
                  <div className={classes.filler} />
                  <div className={classes.Name}>{props.userData.Name}</div>
                  <FilePicker
                    onChange={(FileObject) =>
                      //TODO: Provide Formatted Excel Sheet
                      handleFIleUpload(FileObject)
                    }
                    onError={(errMsg) => {
                      /* do something with err msg string */
                    }}
                  >
                    <Button className={classes.Button2}>Change Pic</Button>
                  </FilePicker>
                </div>
              </span>
            </div>
          </div>
        </Card>
        <div className={classes.Bottom}>
          <div className={classes.Buttons}>
            <span className={classes.column}>
              <Button
                className={classes.Button}
                onClick={Transition.bind(this, "/SignUp")}
              >
                Add User
              </Button>
              <Button onClick={showUser} className={classes.Button}>
                Add Users Via Excel
              </Button>
            </span>
            <span className={classes.column}>
              <Button
                className={classes.Button}
                onClick={Transition.bind(this, "/AddCourse")}
              >
                Add Course
              </Button>

              <Button onClick={showEdited} className={classes.Button}>
                Edit Course
              </Button>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPage)
);
