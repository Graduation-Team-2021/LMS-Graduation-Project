import React from "react";
import classes from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";

const Modal = (props) => {
  const context = props.onClick;

  return (
    <React.Fragment>
      <BackDrop show={props.show} onClick={context} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};
const check = (prev, next) => {
  return prev.show === next.show && prev.children === next.children;
};

export default React.memo(Modal, check);
