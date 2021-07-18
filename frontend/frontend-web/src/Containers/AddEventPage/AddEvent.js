import React, { Component, Fragment } from "react";
import classes from "./AddEvent.module.css";
import InputPart from "./InputPart/InputPart";
import Button from "../../Components/Button/Button";
import Minibar from "../../Components/Minibar/Minibar";

import { Modal, Paper } from "@material-ui/core";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { setNewEvent } from "../../Models/Event";
import { AddNewEvent } from "../../Interface/Interface";

class AddEvent extends Component {
  state = {
    openedModal: false,
    course_id: this.props.course_id,
    event_name: "",
    event_type: [{ name: "Exam", value: "exam" }],
    starting_date: "",
    event_duration: "",
    starting_from: "",
  };
  openModal = () => {
    console.log("Hello from OpenModal");
    this.setState({
      openedModal: true,
    });
  };
  closeModal = () => {
    this.setState({
      openedModal: false,
      course_id: this.props.course_id,
      event_name: "",
      event_type: [{ name: "Exam", value: "exam" }],
      starting_date: "",
      event_duration: "",
      starting_from: "",
    });
  };

  onSelect = (Item) => {
    this.setState({
      event_type: [Item],
    });
  };

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const body = (
      <Paper className={classes.ModalContainer}>
        <div className={classes.AddEvent}>
          <InputPart
            onChange={this.onChange}
            item={this.state.event_type}
            onSelect={(_, item, __) => this.onSelect(item)}
            Data={this.state}
          />
        </div>
        <div className={classes.CreateDiscardContainer}>
          <Button
            className={classes.cancel}
            type="cancel"
            onClick={this.closeModal}
          >
            Cancel
          </Button>
          <Button
            className={classes.accept}
            variant="contained"
            type="correct"
            onClick={() => {
              //TODO: Connect to Backend
              const event = setNewEvent(this.state);
              AddNewEvent(event).then(res=>{
                if(res){
                  alert(res);
                  this.closeModal();
                }
              });
            }}
          >
            Create
          </Button>
        </div>
      </Paper>
    );
    return (
      <Fragment>
        <Button className={this.props.className} onClick={this.openModal}>
          <Minibar icon={faCalendarDay} color="green" info="Add Event" />
        </Button>

        <Modal
          open={this.state.openedModal}
          onClose={this.closeModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Fragment>
    );
  }
}

export default AddEvent;
