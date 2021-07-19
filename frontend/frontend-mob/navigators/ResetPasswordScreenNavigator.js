import { createStackNavigator } from "react-navigation-stack";
import checkConnectivity from "../hocs/checkConnectivity";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
const ResetPassword = createStackNavigator(
  {
    ResetPassword: { screen: checkConnectivity(ResetPasswordScreen) },
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
