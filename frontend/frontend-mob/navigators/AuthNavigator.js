import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainNav from "./MainNavigator";
import LoginScreen from "../screens/Login";
import AuthLoadingScreen from "../screens/AuthLoading";

const AuthNavgiator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    MainNavigator: {
      screen: MainNav,
    },
    Login: LoginScreen,
  },
  { initialRouteName: "AuthLoading" }
);

export default createAppContainer(AuthNavgiator);
