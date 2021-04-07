import React, { useState } from "react";
import NormalTextField from "../NormalTextField/NormalTextField";
import PasswordTextField from "../PasswordField/PasswordField";
import Terms from "../TermsAndConditions/Terms";
import DatePicker from "react-date-picker";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

// import CalendarInput from 'react-calendar-date-picker'

const SignUpField = (props) => {
  const [Birthday, setBirthday] = useState('');
  const [value, onChange] = useState(new Date());

  const onCalenderChange = (value) => {
    value.setHours(2)
    setBirthday(value.toISOString().slice(0,10));
    onChange(value);
  };

  console.log('the valus of the date piker is ', (Birthday));

  return (
    <React.Fragment>
      <NormalTextField
        Error={props.UserNameError}
        Name="UserName"
        onChange={props.onChange}
      />
      <NormalTextField
        Error={props.EmailError}
        Name="Email"
        onChange={props.onChange}
      />
      <NormalTextField
        Error={props.NationalIDError}
        Name="NationalID"
        onChange={props.onChange}
      />
      <NormalTextField
        Error={props.BirthdayError}
        Name="Birthday"
        onChange={props.onChange}
      >
        <DatePicker onChange={onCalenderChange} value={value} />
      </NormalTextField>
      <NormalTextField Error={props.RoleError} Name="Role">
        <RadioGroup
          aria-label="gender"
          name="Role"
          value={props.Role}
          onChange={props.onChange}
        >
          <FormControlLabel
            value="Professor"
            control={<Radio />}
            label="Professor"
          />
          <FormControlLabel
            value="Student"
            control={<Radio />}
            label="stundent"
          />
        </RadioGroup>
      </NormalTextField>
      <PasswordTextField
        Error={props.PasswordError}
        onChange={props.onChange}
      />
      <Terms
        checked={props.checked}
        onChange={props.changeAgreed}
        AgreedError={props.AgreedError}
      />
    </React.Fragment>
  );
};

export default SignUpField;
