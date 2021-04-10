import React, { useState } from "react";
import NormalTextField from "../NormalTextField/NormalTextField";
import PasswordTextField from "../PasswordField/PasswordField";
import Terms from "../TermsAndConditions/Terms";
import DatePicker from "react-date-picker";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

// import CalendarInput from 'react-calendar-date-picker'

const SignUpField = (props) => {
  const [value, onChange] = useState(new Date());

  const onCalenderChange = (value) => {
    value.setHours(2);
    props.onBirthdayChange(value.toISOString().slice(0, 10));
    onChange(value);
  };

  return (
    <React.Fragment>
      <NormalTextField
      value={props.UserName}
        Error={props.UserNameError}
        Name="UserName"
        onChange={props.onChange}
      />
      <NormalTextField
      value={props.Email}
        Error={props.EmailError}
        Name="Email"
        onChange={props.onChange}
      />
      <NormalTextField
      value={props.NationalID}
        Error={props.NationalIDError}
        Name="NationalID"
        onChange={props.onChange}
      />
      <NormalTextField
      value={props.Birthday}
        Error={props.BirthdayError}
        Name="Birthday"
        onChange={props.onChange}
      >
        <DatePicker onChange={onCalenderChange} value={value} />
      </NormalTextField>
      <NormalTextField value={props.Role} Error={props.RoleError} Name="Role">
        <RadioGroup
          name="Role"
          value={props.Role}
          onChange={props.onChange}
        >
          <FormControlLabel
            value="professor"
            control={<Radio />}
            label="Professor"
          />
          <FormControlLabel
            value="student"
            control={<Radio />}
            label="Student"
          />
        </RadioGroup>
      </NormalTextField>
      <PasswordTextField
      value={props.Password}
        Error={props.PasswordError}
        onChange={props.onChange}
      />
      <Terms
      value={props.Agreed}
        checked={props.checked}
        onChange={props.changeAgreed}
        AgreedError={props.AgreedError}
      />
    </React.Fragment>
  );
};

export default SignUpField;
