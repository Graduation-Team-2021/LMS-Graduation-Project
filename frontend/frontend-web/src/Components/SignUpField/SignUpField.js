import React, { useState } from "react";
import NormalTextField from "../NormalTextField/NormalTextField";
import PasswordTextField from "../PasswordField/PasswordField";
import Terms from "../TermsAndConditions/Terms";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";

// import CalendarInput from 'react-calendar-date-picker'

const SignUpField = (props) => {
  const [value, onChange] = useState(new Date());

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
        <DatePicker onChange={onChange} value={value} />
      </NormalTextField>
      <NormalTextField
        Error={props.RoleError}
        Name="Role"
        onChange={props.onChange}
      />
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
