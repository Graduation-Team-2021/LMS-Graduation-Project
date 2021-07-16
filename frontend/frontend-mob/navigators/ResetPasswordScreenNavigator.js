import { createStackNavigator } from "react-navigation-stack";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
const ProfileNavigator = createStackNavigator({
  ResetPassword: { screen: ResetPasswordScreen },
});

export default ProfileNavigator;
