import React from "react";
import { Today, Event, Schedule } from "@material-ui/icons";
import classes from "./InputPart.module.css";
import Input from "../../../Components/Input/Input";
import TextField from "../../../Components/NormalTextField/NormalTextField";
//TODO: add some padding and margin to the input fields down below

const InputPart = (props) => {
  return (
    <div className={classes.full}>
      <div className={classes.row}>
        <Input
          onChange={props.onChange}
          value={props.Data["event_name"]}
          icon={<Event />}
          id="event_name"
          label="The Name of the Event"
        />
        <TextField
          type="select"
          DataList={[{name:"Exam", value:'exam'}]}
          value={props.item}
          onSelect={props.onSelect}
        />
        <Input
          onChange={props.onChange}
          value={props.Data["event_description"]}
          icon={<Event />}
          id="event_description"
          label="Description"
          multiline
        />
      </div>
      <div className={classes.row}>
        <Input
          type="date"
          onChange={props.onChange}
          value={props.Data["starting_date"]}
          icon={<Today />}
          id="starting_date"
          label="starting date"
        />
        <Input
          type="number"
          onChange={props.onChange}
          value={props.Data["event_duration"]}
          icon={<Event />}
          id="event_duration"
          label="Duration in Days"
        />
        <Input
          type="time"
          onChange={props.onChange}
          value={props.Data["starting_from"]}
          icon={<Schedule />}
          id="starting_from"
          label="starting from"
        />
      </div>
    </div>
  );
};

export default InputPart;
