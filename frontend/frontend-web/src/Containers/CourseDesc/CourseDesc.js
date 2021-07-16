import React, { Component } from "react";
import classes from "./CourseDesc.module.css";
import Card from "../../Components/Card/Card";
import Minibar from "../../Components/Minibar/Minibar";
import Modal from "../../Components/Modal/Modal";

import {
  faVideo,
  faFilePdf,
  faQuestionCircle,
  faClipboardList,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import AddEvent from "../AddEventPage/AddEvent";
import { uploadFile } from "../../Interface/Interface";
import Waiting from "../../Components/Waiting/Waiting";
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
    console.log(this.state.file);
    this.setState({ clicked: true, done: false });
    uploadFile(
      this.props.Token,
      this.state.file,
      this.props.CourseID
    ).then(() => this.setState({ done: true, file: null }));
  };

  Uploading = (
    <Waiting Loading={!this.state.done}>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        <h2>Upload Successful</h2>
        <Button
          value="Close"
          onClick={() => this.setState({ clicked: false })}
        />
      </div>
    </Waiting>
  );

  render() {
    return (
      <div className={classes.upcoming}>
        <Modal show={this.state.clicked}>{this.Uploading}</Modal>
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
                    },
                  });
                }}
              >
                <Minibar icon={faPercent} color="orange" info="Edit Grades" />
              </Button>
            </React.Fragment>
          ) : null}

          {this.props.Role === "professor" ? (
            <React.Fragment>
              <AddEvent className={classes.Holder}>
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
