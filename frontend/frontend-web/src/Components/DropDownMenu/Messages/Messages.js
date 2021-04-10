import React from "react";

import { withRouter } from "react-router-dom";

const Messages = (props) => {
  return (
    <React.Fragment>
      <div
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        <h1>{"Message"}</h1>
        <h1>{"Message"}</h1>
        <h1>{"Message"}</h1>
        <h1>{"Message"}</h1>
        <h1>{"Message"}</h1>
        <h1>{"Message"}</h1>
        <h1>{"Message"}</h1>
        <h1>{"Message"}</h1>
      </div>
      <div
        onClick={() => {
          props.onClick();
          props.history.push("/messenger");
        }}
        style={{
          fontSize: "xx-large",
          fontWeight: "bold",
          boxSizing: "border-box",
          borderTop: "1px solid black",
          padding: "5% 0",
          cursor: "pointer",
          color: "blue",
        }}
      >
        See All Messages
      </div>
    </React.Fragment>
  );
};

export default withRouter(Messages);
