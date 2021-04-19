import React from 'react';
import classes from './PasswordField.module.css';

const PasswordTextField = (props) => {
    const Field = !props.Error
      ? classes.Field
      : classes.Field + " " + classes.ErrorField;

    return (
        <React.Fragment>
        <h2 className={classes.Title}>Password</h2>
        <input
        required
          type="password"
          name="Password"
          className={Field}
          placeholder="ex:1234"
          value={props.value}
          onChange={props.onChange}
        />
        {props.Error?<p style={{
            color: 'red'
        }}>Please Insert Valid Data</p>:null} 
        </React.Fragment>
    );
}
 
export default PasswordTextField

