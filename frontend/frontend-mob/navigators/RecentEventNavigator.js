import { createStackNavigator } from "react-navigation-stack";
import RecentEventScreen from "../screens/RecentEventScreen";
const RecentEvent = createStackNavigator(
  {
    RecentEvents: { screen: checkConnectivity(RecentEventScreen) },
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

export default RecentEvent;
