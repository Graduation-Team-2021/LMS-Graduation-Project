import { createStackNavigator } from "react-navigation-stack";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
const ResetPassword = createStackNavigator({
  ResetPassword: { screen: ResetPasswordScreen },
});

export default ResetPassword;
