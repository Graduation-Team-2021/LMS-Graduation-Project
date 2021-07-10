import React, { Component, Fragment } from "react";
import classes from "./AddEvent.module.css";
import InputPart from "./InputPart/InputPart";
import NotificationPart from "./NotificationsPart/NotificationsPart";
import Button from "../../Components/Button/Button";
import Minibar from "../../Components/Minibar/Minibar";

import { Modal, Paper } from "@material-ui/core";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

class AddEvent extends Component {
  state = {
    openedModal: false,
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
    });
  };
  body = (
    <Paper className={classes.ModalContainer}>
      <div className={classes.AddEvent}>
        <InputPart />
        <NotificationPart />
      </div>
      <div className={classes.CreateDiscardContainer}>
        <Button color="secondary" onClick={this.closeModal}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            alert("The Event is being created");
            this.closeModal();
          }}
        >
          Create
        </Button>
      </div>
    </Paper>
  );
  render() {
    return (
      <Fragment>
        <span className={classes.Container}>
          <Button onClick={this.openModal} className={classes.Holder}>
            <Minibar icon={faCalendarDay} color="green" info="Add Event" />
          </Button>
        </span>
        <Modal
          open={this.state.openedModal}
          onClose={this.closeModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {this.body}
        </Modal>
      </Fragment>
    );
  }
}

export default AddEvent;
