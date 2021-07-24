import React, { Component } from "react";
import classes from "./CourseDesc.module.css";
import Card from "../../Components/Card/Card";
import Minibar from "../../Components/Minibar/Minibar";

import {
  faVideo,
  faFilePdf,
  faQuestionCircle,
  faClipboardList,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import AddEvent from "../AddEventPage/AddEvent";
import { uploadFile, getMarks } from "../../Interface/Interface";
import Button from "../../Components/Button/Button";

class CourseDesc extends Component {
  state = {
    file: null,
    clicked: false,
    done: true,
  };

  handleFIleUpload = (event) => {
    this.setState(
      //TODO: enable Multiple Files
      /* (state, props)=>{
      let temp = [...state.file]
      temp.push(event.target.value)
      return {
        file: temp
      }
    } */
      {
        file: event.target.files[0],
      }
    );
  };

  Submit = () => {
    if (this.state.file) {
      this.props.setContent("Upload");
      this.props.setShow(true);
      this.props.setWaiting(true);
      uploadFile(this.state.file, this.props.CourseID).then(() => {
        this.props.setWaiting(false);
        this.setState({ file: null });
      });
    } else {
      alert("Add Files First");
    }
  };

  Marks = () => {
    this.props.setWaiting(true);
    this.props.setShow(true);
    getMarks(this.props.ID, this.props.CourseID).then((res) => {
      if (res) {
        console.log(res);
        this.props.setFinal(res.final_exam_mark);
        this.props.setMid(res.mid_term_mark);
        this.props.setAssign(res.assign);
        this.props.setContent("Grades");
        this.props.setWaiting(false);
      } else {
        alert("Error occured, Please try Again Later")
      }
    });
  };

  render() {
    return (
      <div className={classes.upcoming}>
        <div className={classes.Title}>About</div>
        <div className={classes.EventTitle}>{this.props.desc}</div>
        <div className={classes.Title}>
          Taught By:{" "}
          {this.props.Course.DoctorName.length !== 0
            ? this.props.Course.DoctorName.join(", ")
            : "No One Yet"}
        </div>
        <div className={classes.Container}>
          <Button
            className={classes.Holder}
            onClick={() => {
              this.props.history.push({
                pathname: `/Course/${this.props.CourseID}/Videos`,
                state: {
                  Data: this.props.Course,
                },
              });
            }}
          >
            <Minibar icon={faVideo} color="rgb(0, 102, 255)" info="Videos" />
          </Button>
          <Button
            className={classes.Holder}
            onClick={() => {
              this.props.history.push({
                pathname: `/Course/${this.props.CourseID}/PDFs`,
                state: {
                  name: this.props.Title,
                },
              });
            }}
          >
            <Minibar icon={faFilePdf} color="red" info="Pdfs" />
          </Button>
          <Button
            className={classes.Holder}
            onClick={() => {
              this.props.history.push({
                pathname: `/Course/${this.props.CourseID}/Quiz`,
                state: {
                  name: this.props.Title,
                },
              });
            }}
          >
            <Minibar icon={faQuestionCircle} color="orange" info="Quizzes" />
          </Button>
          <Button
            className={classes.Holder}
            onClick={() => {
              this.props.history.push({
                pathname: `/Course/${this.props.CourseID}/Deliv`,
                state: {
                  name: this.props.Title,
                },
              });
            }}
          >
            <Minibar
              icon={faClipboardList}
              color="purple"
              info="Deliverables"
            />
          </Button>
          {this.props.Role === "professor" ? (
            <React.Fragment>
              <Button
                className={classes.Holder}
                onClick={() => {
                  this.props.history.push({
                    pathname: `/Course/${this.props.CourseID}/newQuiz`,
                    state: {
                      name: this.props.Title,
                    },
                  });
                }}
              >
                <Minibar
                  icon={faQuestionCircle}
                  color="rgb(0, 102, 255)"
                  info="Add Quiz"
                />
              </Button>
              <Button
                className={classes.Holder}
                onClick={() => {
                  this.props.history.push({
                    pathname: `/Course/${this.props.CourseID}/newDeliv`,
                    state: {
                      name: this.props.Title,
                    },
                  });
                }}
              >
                <Minibar
                  icon={faClipboardList}
                  color="red"
                  info="Add Deliverable"
                />
              </Button>
              <Button
                className={classes.Holder}
                onClick={() => {
                  this.props.history.push({
                    pathname: `/Course/${this.props.CourseID}/Marks`,
                    state: {
                      name: this.props.Title,
                      mid: this.props.Course.mid,
                      final: this.props.Course.final,
                    },
                  });
                }}
              >
                <Minibar icon={faPercent} color="orange" info="Edit Grades" />
              </Button>
            </React.Fragment>
          ) : (
            <Button className={classes.Holder} onClick={this.Marks}>
              <Minibar icon={faPercent} color="orange" info="Show Grades" />
            </Button>
          )}

          {this.props.Role === "professor" ? (
            <React.Fragment>
              <AddEvent
                course_id={this.props.Course.CourseID}
                className={classes.Holder}
              >
                <div
                  style={{
                    padding: "0 0 10% 0",
                  }}
                >
                  <Card
                    shadow
                    style={{
                      padding: "5% 0",
                    }}
                  >
                    <Minibar icon={faFilePdf} color="red" info="test" />
                  </Card>
                </div>
              </AddEvent>
            </React.Fragment>
          ) : null}
        </div>
        {this.props.Role === "professor" ? (
          <div
            className={classes.Container2}
            style={{
              padding: "10% 0",
            }}
          >
            <Card className={classes.koko} shadow>
              <label
                style={{
                  alignSelf: "flex-start",
                  padding: "0 0 10% 0",
                  fontSize: "200%",
                  fontWeight: "bold",
                }}
              >
                Upload Material:
              </label>
              <input
                type="file"
                id="myfile"
                name="myfile"
                multiple
                onChange={this.handleFIleUpload}
                value={this.state.file}
              />
              <br />
              <Button className={classes.Button} onClick={this.Submit}>
                Submit
              </Button>
            </Card>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(CourseDesc);
