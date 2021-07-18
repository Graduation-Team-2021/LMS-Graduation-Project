import { createStackNavigator } from "react-navigation-stack";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
const ResetPassword = createStackNavigator(
  {
    ResetPassword: { screen: ResetPasswordScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "rgb(61, 109, 204)",
      },
      cardStyle: {
        backgroundColor: "transparent",
        opacity: 1,
      },
      headerTintColor: "white",
    },
  }
);

export default ResetPassword;
