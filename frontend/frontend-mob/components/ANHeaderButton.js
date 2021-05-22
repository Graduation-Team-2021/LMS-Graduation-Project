import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";
const IoniconHeaderButton = (props) => {
  return <HeaderButton IconComponent={Ionicons} iconSize={23} {...props}   />;
};

export default IoniconHeaderButton;
