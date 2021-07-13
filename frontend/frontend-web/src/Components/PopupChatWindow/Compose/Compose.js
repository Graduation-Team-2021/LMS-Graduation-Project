import "./Compose.css";
import React from "react";

export default function Compose(props) {
  return (
    <div className="compose">
      <input
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        type="text"
        className="compose-input"
        placeholder="Type a message..."
      />

      {props.rightItems}
      {props.children}
    </div>
  );
}
