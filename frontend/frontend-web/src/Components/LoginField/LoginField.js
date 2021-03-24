import React from "react";
import NormalTextField from "../NormalTextField/NormalTextField";
import PasswordTextField from "../PasswordField/PasswordField";

const LoginField = (props) => {
  return (
    <React.Fragment>
      <NormalTextField
        Error={props.EmailError}
        Name="Email"
        onChange={props.onChange}
      />
      <PasswordTextField
        Error={props.PasswordError}
        onChange={props.onChange}
      />
    </React.Fragment>
  );
};

export default LoginField;
