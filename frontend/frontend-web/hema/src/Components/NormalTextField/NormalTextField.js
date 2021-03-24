import React from 'react';
import classes from './NormalTextField.module.css';

const TextField = (props) => {
    const Field = !props.Error
      ? classes.Field
      : classes.Field + " " + classes.ErrorField;

    return (
        <React.Fragment>
        <h2 className={classes.Title}>{props.Name}</h2>
        <input
          type="text"
          name={props.Name}
          className={Field}
          placeholder={"Enter Your "+props.Name+" Here"}
          onChange={props.onChange}
          required
        />
        {props.Error?<p style={{
            color: 'red'
        }}>This Field Can't be Empty</p>:null} 
        </React.Fragment>
    );
}
 
export default TextField

