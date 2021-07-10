import React, { Component } from "react";
import classes from "./CourseDesc.module.css";
import Card from "../../Components/Card/Card";
import Minibar from "../../Components/Minibar/Minibar";
import { faVideo, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import AddEvent from "../AddEventPage/AddEvent";
import { uploadFile } from "../../Interface/Interface";

class CourseDesc extends Component {
  state = {
    file: null,
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
    uploadFile(this.props.Token, this.state.file, this.props.CourseID);
  };

  render() {
    return (
      <div className={classes.upcoming}>
        <div className={classes.Title}>About</div> 
        <div className={classes.EventTitle}>{this.props.desc}</div>
        <div className = {classes.Container}>
        <div
          style={{
            padding: "0 0 10% 0",
          }}
          onClick={() => {
            this.props.history.push({
              pathname: `/Course/${this.props.CourseID}/Videos`,
              state: {
                Data: this.props.Course
              },
            });
          }}
        >
          <Card
            shadow
            style={{
              padding: "5% 0",
            }}
          >
            <Minibar icon={faVideo} color=" rgb(0, 102, 255)" info="Videos" />
          </Card>
        </div>
        <div
          style={{
            padding: "0 0 10% 0",
          }}
          onClick={() => {
            this.props.history.push({
              pathname: `/Course/${this.props.CourseID}/PDFs`,
              state: {
                name: this.props.Title,
              },
            });
          }}
        >
          <Card
            shadow
            style={{
              padding: "5% 0",
            }}
          >
            <Minibar icon={faFilePdf} color=" red" info="Pdfs" />
          </Card>
        </div>
      </div>
        {this.props.Role === "professor" ? (
          <React.Fragment>
            <AddEvent>
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
                  <Minibar icon={faFilePdf} color=" red" info="test" />
                </Card>
              </div>
            </AddEvent>
            <div
              style={{
                padding: "10% 0",
              }}
            >
              <Card
                shadow
                style={{
                  padding: "10%",
                }}
              >
                <label
                  style={{
                    padding: "0 0 10% 0",
                  }}
                >
                  Select files:
                </label>
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  multiple
                  onChange={this.handleFIleUpload}
                />
                <br></br>
                <input type="submit" onClick={this.Submit} />
              </Card>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default withRouter(CourseDesc);
