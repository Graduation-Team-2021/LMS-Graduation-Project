import React, { Component } from "react";
import classes from "./GroupDesc.module.css";
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar";
import CircularNumber from "../../Components/CircularNumber/CircularAvatar";
import filler from "../../assets/Filler.png";
import Card from "../../Components/Card/Card";
import Minibar from "../../Components/Minibar/Minibar";
import { faVideo, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import AddEvent from "../../Containers/AddEventPage/AddEvent";
import { uploadFile } from "../../Interface/Interface";

class Upcoming extends Component {
  state = {
    file: null,
  };

  handleFIleUpload = (event) => {
    this.setState(
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
    console.log(this.state.file)
    uploadFile(this.props.Token, this.state.file, this.props.CourseID);
  };

  render() {
    let Joined = [];

    const Number = 21;

    if (Number > 6) {
      Joined.push(
        <div
          key={0}
          className={classes.Circle}
          style={{
            zIndex: Number,
          }}
        >
          <CircularNumber
            filler={"+" + (Number - 5 <= 999 ? Number - 5 : 999)}
          />
        </div>
      );
    }

    for (let index = 0; index < (Number <= 6 ? Number : 5); index++) {
      Joined.push(
        <div
          key={index + 1}
          className={classes.Circle}
          style={{
            zIndex: Number - index - (Number > 6 ? 1 : 0),
            transform:
              "translateX(" + (-index - (Number > 4 ? 1 : 0)) * 40 + "px)",
          }}
        >
          <CircularAvatar filler={filler} />
        </div>
      );
    }

    return (
      <div className={classes.upcoming}>
        <div className={classes.Title}>About</div>
        <div className={classes.EventTitle}>{this.props.desc}</div>
        <div
          style={{
            padding: "0 0 10% 0",
          }}
          onClick={() => {
            this.props.history.push("/Videos");
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
            this.props.history.push("/Pdfs");
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
        {this.props.Role === "student" ? (
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
            <div style={{
              padding: '10% 0'
            }}>
              <Card shadow 
              style={{
                padding: '10%'
              }}>
                <label style={{
                  padding: '0 0 10% 0'
                }}>Select files:</label>
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

export default withRouter(Upcoming);
