import React from "react";
import { Today, Event, Schedule } from "@material-ui/icons";
import classes from "./InputPart.module.css";
import Input from '../../../Components/Input/Input'
//TODO: add some padding and margin to the input fields down below

const InputPart = (props) => {
  return (
    <div  >
      <Input icon ={<Event/> } id="event_name" label = "The Name of the Event"/>
      <div className={classes.row}>
        <Input icon ={<Today/>} id="starting_date" label ="starting date" />
        <Input icon ={<Event/>} id="ending_date" label ="ending date" />

      </div>
      <div className={classes.row}>
        <Input icon ={<Schedule/> } id="starting_from" label ="starting from"/>
        <Input icon ={<Schedule/>} id="ending_in" label ="ending in" />

      </div>
      
    </div>
  );
};

export default InputPart;
