import React from 'react';
import Button from './Button/Button';
import classes from './ButtonArray.module.css'
 
const ButtonArray = (props) => {

    return (
        <div className={classes.ButtonArea}>
            <Button 
            value="Sign in"
            isActive={props.logging_in}
            onClick={props.SigninCLicked}
            />
          </div>

    );
}
 
export default ButtonArray