import { createStackNavigator } from "react-navigation-stack";
import RecentEventScreen from "../screens/RecentEventScreen";
const RecentEvent = createStackNavigator({
  RecentEvents: { screen: RecentEventScreen },
});

export default RecentEvent;
