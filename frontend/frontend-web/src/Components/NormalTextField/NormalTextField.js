import React from "react";
//import { Multiselect } from "multiselect-react-dropdown";
import Multiselect from "react-select";
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
        styles={{
          container: (provided, state) => ({
            ...provided,
            width: "100%",
          }),
        }}
        value={props.value.map(value=>({label: value.name, value: value.value}))}
        isMulti={props.multiple}
        options={props.DataList.map((value) => ({
          label: value.name,
          value: value.value,
        }))}
        onChange={(value, action) => {
          const List = "";
          console.log("changed", action.action, value);
          if (action.action === "select-option") {
            console.log("Selected", value[value.length - 1]);
            return props.onSelect(
              List,
              {
                name: props.multiple?value[value.length - 1].label:value.label,
                value: props.multiple?value[value.length - 1].value:value.value,
              },
              props.Name
            );
          } else if (action.action === "remove-value") {
            return props.onRemove(
              List,
              {
                name: props.multiple?value[value.length - 1].label:value.label,
                value: props.multiple?value[value.length - 1].value:value.value,
              },
              props.Name
            );
          } else if (action.action === "clear"){
            return props.onClear(props.Name);
          } else {
            return null;
          }
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
  type: PropTypes.any,
  Name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  DataList: PropTypes.array,
  onSelect: PropTypes.func,
  flex: PropTypes.number,
};

export default TextField;
