import React, { useEffect, useState } from "react";
import Waiting from "../Waiting/Waiting";
import Button from "../Button/Button";
import classes from "./Enroll.module.css";

const Enroll = (props) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(0);

  useEffect(() => {
    //Load Status
    setLoading(false);
    setResponse(0);
  }, []);

  const canEnroll = <p>Do you want to enroll?</p>;

  const cantEnroll = <p>Can't Enroll without Prerequistes</p>;

  const timeOut = <p>Please wait till Enrollment is allowed</p>;

  const messages = [canEnroll, cantEnroll, timeOut];

  return (
    <Waiting Loading={loading}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: 'center',
          width: "100%",
        }}
      >
        {messages[response]}
        <span
        className={response===0?classes.Holder1:classes.Holder2}
        >
          {response ===0 ? <Button className={classes.Button} onClick={props.onAccept}>Enroll</Button> : null}
          <Button className={classes.Button} type="cancel" onClick={props.onCancel}>
            {response === 0 ? "Cancel" : "Dismiss"}
          </Button>
        </span>
      </div>
    </Waiting>
  );
};

export default Enroll;