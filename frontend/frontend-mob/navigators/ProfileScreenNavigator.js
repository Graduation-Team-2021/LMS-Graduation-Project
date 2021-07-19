import { createStackNavigator } from "react-navigation-stack";
import checkConnectivity from "../hocs/checkConnectivity";
import ProfileScreen from "../screens/ProfileScreen";
const ProfileNavigator = createStackNavigator(
  {
    Profile: { screen: checkConnectivity(ProfileScreen) },
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
