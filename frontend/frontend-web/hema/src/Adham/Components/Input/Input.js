import React from "react";
import { Grid, TextField } from "@material-ui/core";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.Input} >
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>{props.icon}</Grid>
        <Grid item>
          <TextField id="input-with-icon-grid" label="With a grid" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Input;
