import React from 'react';
import classes from './Button.module.css'
const Button = (props) => {

    return (
        <input
              type="button"
              value={props.value}
              className={classes.Button + " " + classes.Active+" "+props.className}
              onClick={props.onClick}
            />
    
    );
}
 
export default Button