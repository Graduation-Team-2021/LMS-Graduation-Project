import classes from './BackDrop.module.css';
import React from "react";
const BackDrop = (props) => {
    const hide = props.onClick;

    return (props.show ?
        <div className={classes.BackDrop} onClick={hide}>
        </div> : null
    );
}

export default BackDrop