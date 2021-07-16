import React, { useEffect, useState } from "react";
import Waiting from "../Waiting/Waiting";
import Button from "../Button/Button";
import classes from "./Enroll.module.css";
import { getStatus } from "../../Interface/Interface";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

const Enroll = (props) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(0);

  useEffect(() => {
    //Load Status
    if (!props.isEnrolled) {
      getStatus(props.id, props.userData.Token).then((res) => {
        console.log(res);
        if (res === "Can Enroll") setResponse(0);
        else if (res === "Can't Enroll") setResponse(1);
        else setResponse(2);
      });
    }
    setLoading(false);
  }, [props.id, props.userData.Token]);

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
          alignItems: "center",
          width: "100%",
        }}
      >
        {messages[response]}
        <span className={response === 0 ? classes.Holder1 : classes.Holder2}>
          {response === 0 ? (
            <Button className={classes.Button} onClick={props.onAccept}>
              Enroll
            </Button>
          ) : null}
          <Button
            className={classes.Button}
            type="cancel"
            onClick={props.onCancel}
          >
            {response === 0 ? "Cancel" : "Dismiss"}
          </Button>
        </span>
      </div>
    </Waiting>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Enroll);
