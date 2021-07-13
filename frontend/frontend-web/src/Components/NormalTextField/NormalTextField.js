import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

import classes from "./NormalTextField.module.css";
import PropTypes from "prop-types";

const TextField = (props) => {
  const Field = !props.Error
    ? classes.Field
    : classes.Field + " " + classes.ErrorField;
  let inputField =
    props.type === "textArea" ? (
      <textarea
        rows={7}
        value={props.value}
        name={props.Name}
        className={Field}
        placeholder={"Enter Your " + props.Name + " Here"}
        onChange={props.onChange}
        required
      />
    ) : props.type === "select" ? (
      <Multiselect
        singleSelect={!props.multiple}
        options={props.DataList}
        selectedValues={props.value}
        onSelect={(List, Item) => props.onSelect(List, Item, props.Name)}
        onRemove={(List, Item) => props.onRemove(List, Item, props.Name)}
        displayValue="name"
        style={{
          searchBox: {
            fontWeight: 'bold',
            height: "50%",
            fontSize: '1em',
          },
        }}
      />
    ) : (
      <input
        value={props.value}
        type={props.type || "text"}
        name={props.Name}
        className={Field}
        placeholder={"Enter Your " + props.Name + " Here"}
        onChange={props.onChange}
        required
      />
    );
  if (props.children) {
    inputField = props.children;
  }
  return (
    <span
      style={{ display: "flex", alignItems: "center", flex: props.flex || 1 }}
    >
      {!props.hide ? <h2 className={classes.Title}>{props.Name}</h2> : null}
      {inputField}
      {props.Error ? (
        <p
          style={{
            color: "red",
          }}
        >
          Invalid Data
        </p>
      ) : null}
    </span>
  );
};

TextField.propTypes = {
  Error: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["textArea", "select", "text"]),
  Name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  DataList: PropTypes.array,
  onSelect: PropTypes.func,
  flex: PropTypes.number,
};

export default TextField;
