import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { Today, Event, Schedule } from "@material-ui/icons";
import classes from "./InputPart.module.css";
import Input from '../../../Components/Input/Input'
//TODO: add some padding and margin to the input fields down below

const InputPart = (props) => {
  return (
    <div  >
      <Input icon ={<Event/>} />
      <div className={classes.row}>
        <Input icon ={<Today/>} />
        <Input icon ={<Event/>} />

      </div>
      <div className={classes.row}>
        <Input icon ={<Schedule/>} />
        <Input icon ={<Schedule/>} />

      </div>
      <Input icon ={<Event/>} />
    </div>
  );
};

export default InputPart;
