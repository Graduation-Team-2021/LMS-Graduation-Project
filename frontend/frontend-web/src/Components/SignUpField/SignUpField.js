import React from "react";
import NormalTextField from "../NormalTextField/NormalTextField";
import PasswordTextField from "../PasswordField/PasswordField";
import Terms from '../TermsAndConditions/Terms'

const SignUpField = (props) => {
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
      />
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
