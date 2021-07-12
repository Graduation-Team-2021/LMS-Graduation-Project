import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

import classes from "./NormalTextField.module.css";
import PropTypes from "prop-types";

/* <select
        value={props.value}
        name={props.Name}
        className={Field}
        placeholder={"Enter Your " + props.Name + " Here"}
        onChange={props.onChange}
        multiple={props.multiple}
        required
        >
        {props.DataList.map((value, index)=><option key={index} value={value.value}>{value.name}</option>)}
        </select> */

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
    <React.Fragment>
      <h2 className={classes.Title}>{props.Name}</h2>
      {inputField}
      {props.Error ? (
        <p
          style={{
            color: "red",
          }}
        >
          Please Insert Valid Data
        </p>
      ) : null}
    </React.Fragment>
  );
};

TextField.propTypes = {
  Error: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["textArea", 'select',]),
  Name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  DataList: PropTypes.array,
  onSelect: PropTypes.func
};

export default TextField;
