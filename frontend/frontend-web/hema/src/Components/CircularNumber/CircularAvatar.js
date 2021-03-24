import classes from './CircularAvatar.module.css';
import React from 'react';
 
const CircularAvatar = (props) => {
    return (
        <div className={classes.Main} style={props.style}>
           <div style={{
               color:'white',
               fontSize: "1.2vw",
               
           }}>{props.filler}</div> 
        </div>
    );
}
 
export default CircularAvatar