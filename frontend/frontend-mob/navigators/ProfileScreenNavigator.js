import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/ProfileScreen";
const ProfileNavigator = createStackNavigator(
  {
    Profile: { screen: ProfileScreen },
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

export default ProfileNavigator;
